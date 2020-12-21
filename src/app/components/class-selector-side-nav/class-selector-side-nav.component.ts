import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectedMappingFilters} from '../../util/selected-mappings-filter';
import {Mapping} from '../../../generated';

@Component({
  selector: 'app-class-selector-side-nav',
  templateUrl: './class-selector-side-nav.component.html',
  styleUrls: ['./class-selector-side-nav.component.scss']
})
export class ClassSelectorSideNavComponent implements OnInit {

  @Input()
  packageName = '';

  @Input()
  selectionFilters: SelectedMappingFilters | null = null;

  @Output()
  classSelected: EventEmitter<Mapping> = new EventEmitter<Mapping>();

  constructor() { }

  ngOnInit(): void {
  }

}
