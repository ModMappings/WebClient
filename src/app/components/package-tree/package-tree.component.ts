import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FlatTreeControl, NestedTreeControl} from '@angular/cdk/tree';
import {MatTree, MatTreeNestedDataSource} from '@angular/material/tree';
import {PackageNode, PackageTree} from '../../util/package-tree';
import {Observable, SubscriptionLike} from 'rxjs';
import {SelectedMappingFilters} from '../../util/selected-mappings-filter';
import {map} from 'rxjs/operators';
import {PackageManagementService} from '../../services/package-management.service';
import {PackageTreeDatasource} from '../../util/package-tree-datasource';

interface Node {
  name: string;
  type?: 'class' | 'package';
  children?: Node[];
}

@Component({
  selector: 'app-package-tree',
  templateUrl: './package-tree.component.html',
  styleUrls: ['./package-tree.component.scss']
})
export class PackageTreeComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  selectionFilters: SelectedMappingFilters | null = null;

  @Output()
  packageSelected = new EventEmitter<string>();

  packageUpdateSubscription: SubscriptionLike | null = null;

  treeControl: FlatTreeControl<PackageNode>;

  dataSource: PackageTreeDatasource;

  getLevel = (node: PackageNode) => node.depth;

  isExpandable = (node: PackageNode) => node.children.length !== 0;

  hasChild = (_: number, node: PackageNode) => node.children.length !== 0;

  constructor(
    private packageManagementService: PackageManagementService
  ) {
    this.treeControl = new FlatTreeControl<PackageNode>(this.getLevel, this.isExpandable);
    this.dataSource = new PackageTreeDatasource(this.treeControl, packageName => {
      return this.packageManagementService.getPackagesInWithDirectChildren(
        `${packageName}/`,
        this.selectionFilters?.gameVersion?.id,
        this.selectionFilters?.mappingType?.id,
        this.selectionFilters?.release?.id
      );
    });
  }

  ngOnInit() {
    this.dataSource.data = [];
  }

  ngOnDestroy(): void {
    this.packageUpdateSubscription?.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updatePackages();
  }

  icon(node: PackageNode): string {
    return node.children.length !== 0 && this.treeControl.isExpanded(node) ? 'folder_open' : 'folder';
  }

  private updatePackages(): void {
    if (this.selectionFilters == null)
    {
      this.dataSource.data = [];
      return;
    }

    this.packageUpdateSubscription = this.packageManagementService.getPackagesInWithDirectChildren(
      '',
      this.selectionFilters.gameVersion?.id,
      this.selectionFilters.mappingType?.id,
      this.selectionFilters.release?.id)
      .pipe(
        map(packages => new PackageTree(packages))
      ).subscribe(packageTree => this.dataSource.data = packageTree.root.children);
  }

  onNodeSelected(node: PackageNode) {
    this.packageSelected.emit(node.name);
  }
}
