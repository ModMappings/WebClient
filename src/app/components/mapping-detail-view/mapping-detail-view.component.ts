import {Component, Input, OnInit} from '@angular/core';
import {Mapping, MappingType} from '../../../generated';

@Component({
  selector: 'app-mapping-detail-view',
  templateUrl: './mapping-detail-view.component.html',
  styleUrls: ['./mapping-detail-view.component.scss']
})
export class MappingDetailViewComponent implements OnInit {

  @Input()
  mapping: Mapping;

  constructor() { }

  ngOnInit(): void {
  }

}
