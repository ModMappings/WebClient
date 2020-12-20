import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectedMappingFilters} from '../../util/selected-mappings-filter';

@Component({
  selector: 'app-package-tree-side-nav',
  templateUrl: './package-tree-side-nav.component.html',
  styleUrls: ['./package-tree-side-nav.component.scss']
})
export class PackageTreeSideNavComponent implements OnInit {

  @Input()
  selectionFilters: SelectedMappingFilters | null = null;

  @Output()
  packageSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

}
