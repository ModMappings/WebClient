import {Component, Input, OnInit} from '@angular/core';
import {SelectedMappingFilters} from '../../util/selected-mappings-filter';
import {DetailedMapping, MappableType} from '../../../generated';

@Component({
  selector: 'app-field-viewer',
  templateUrl: './field-viewer.component.html',
  styleUrls: ['./field-viewer.component.scss']
})
export class FieldViewerComponent implements OnInit {

  @Input()
  selectionFilters: SelectedMappingFilters | null = null;

  @Input()
  mapping: DetailedMapping | null;

  constructor() { }

  ngOnInit(): void {
  }

  canDisplay(): boolean {
    return this.mapping != null && this.mapping.mappable?.type === MappableType.FIELD;
  }
}
