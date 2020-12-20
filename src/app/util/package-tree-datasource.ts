import {CollectionViewer, DataSource, SelectionChange} from '@angular/cdk/collections';
import {PackageNode, PackageTree} from './package-tree';
import {BehaviorSubject, merge, Observable, of} from 'rxjs';
import {FlatTreeControl} from '@angular/cdk/tree';
import {PackageManagementService} from '../services/package-management.service';
import {map, mergeMap, toArray} from 'rxjs/operators';

export class PackageTreeDatasource implements DataSource<PackageNode> {

  dataChange = new BehaviorSubject<PackageNode[]>([]);

  get data(): PackageNode[] { return this.dataChange.value; }
  set data(value: PackageNode[]) {
    this.treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(private treeControl: FlatTreeControl<PackageNode>,
              private dataProvider: (packageName: string) => Observable<string[]>) {}

  connect(collectionViewer: CollectionViewer): Observable<PackageNode[]> {
    this.treeControl.expansionModel.changed.subscribe(change => {
      if ((change as SelectionChange<PackageNode>).added ||
        (change as SelectionChange<PackageNode>).removed) {
        this.handleTreeControl(change as SelectionChange<PackageNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  disconnect(collectionViewer: CollectionViewer): void {}

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<PackageNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: PackageNode, expand: boolean) {
    const children = this.dataProvider(node.name);
    const index = this.data.indexOf(node);
    if (!children || index < 0) { // If no children, or cannot find the node, no op
      return;
    }

    if (expand) {
      node.isLoading = true;
      children.pipe(
        map(packages => {
          return new PackageTree(packages);
        }),
        map(tree => {
          return tree.getNode(node.name)?.children ?? [];
        }),
        mergeMap(packages => {
          return of(...packages);
        }),
        toArray()
      )
        .subscribe(nodes => {
          this.data.splice(index + 1, 0, ...nodes);
          node.isLoading = false;
          this.dataChange.next(this.data);
        });
    } else {
      let count = 0;
      for (let i = index + 1; i < this.data.length
      && this.data[i].depth > node.depth; i++, count++) {}
      this.data.splice(index + 1, count);
      this.dataChange.next(this.data);
    }
  }
}
