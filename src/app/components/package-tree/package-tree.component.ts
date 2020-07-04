import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NestedTreeControl, TreeControl} from '@angular/cdk/tree';
import {MatTree, MatTreeNestedDataSource} from '@angular/material/tree';
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

  @Output()
  packageSelected = new EventEmitter<string>();


  treeControl: NestedTreeControl<PackageNode> = new NestedTreeControl<PackageNode>(node => {
    return node.children;
  });
  dataSource = new MatTreeNestedDataSource<PackageNode>();

  @ViewChild(MatTree)
  matTree: MatTree<any>;

  hasChild = (_: number, node: PackageNode) => {
    return node.children.length !== 0;
  }

  constructor() {

  }

  ngOnInit() {
    this.dataSource.data = this.tree.root.children;
  }

  icon(node: PackageNode): string {
    return node.children.length !== 0 && this.treeControl.isExpanded(node) ? 'folder_open' : 'folder';
  }
}
