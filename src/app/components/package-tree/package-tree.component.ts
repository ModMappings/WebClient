import {Component, OnInit} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import {flatten, makeHierarchical, PackageNode} from '../../util/package-tree';

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

  private readonly treeData: PackageNode[];

  treeControl = new NestedTreeControl<PackageNode>(node => node.children == null ? null : [...node.children.values()]);
  dataSource = new MatTreeNestedDataSource<PackageNode>();

  constructor() {
    const packages = makeHierarchical(
      [
        'foo',
        'foo.bar',
        'bar',
        'foo.bar.quuz',
        'foo.bar.quak'
      ].sort()
    );
    const flattened = flatten(packages);
    if (flattened.name === '') {
      this.treeData = flattened.children == null ? [] : [...flattened.children.values()];
    } else {
      this.treeData = [flattened];
    }
    this.dataSource.data = this.treeData;
  }

  ngOnInit() {
  }

  hasChild(_: number, node: PackageNode) {
    return node.children != null && node.children.size > 0;
  }

  icon(node: PackageNode): string {
    return /*node.type === 'class' ? 'code' : */this.treeControl.isExpanded(node) ? 'folder_open' : 'folder';
  }
}
