import {Component, Input, OnInit} from '@angular/core';
import {NestedTreeControl, TreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {PackageNode, PackageTree} from '../../util/package-tree';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

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
export class PackageTreeComponent implements OnInit {

  @Input()
  tree: PackageTree;

  private readonly treeData: PackageNode[];

  treeControl: NestedTreeControl<PackageNode>;
  dataSource = new MatTreeNestedDataSource<PackageNode>();

  hasChild = (_: number, node: PackageNode) => {
    return node.hasChildren;
  }

  constructor() {

  }

  ngOnInit() {
    this.treeControl = new NestedTreeControl<PackageNode>(node => {
      return this.tree.getImmediateChildrenIfLoaded(node.name);
    });
    this.tree.getImmediateChildren(this.tree.rootNode.name).subscribe(children => {
      this.dataSource.data = children;
    });
  }

  loadChildren(node: PackageNode) {
    this.tree.loadChildren(node.name).subscribe(() => {
      this.dataSource.data = [];
      this.dataSource.data = this.tree.getImmediateChildrenIfLoaded(this.tree.rootNode.name) || [];
    });
  }

  icon(node: PackageNode): string {
    if (!node.hasChildren) {
      return 'folder';
    } else if (this.treeControl.isExpanded(node)) {
      if (this.tree.isLoadingChildren(node.name)) {
        return 'hourglass_bottom';
      } else {
        return 'folder_open';
      }
    }
    return /*node.type === 'class' ? 'code' : */node.hasChildren && this.treeControl.isExpanded(node) ? 'folder_open' : 'folder';
  }
}
