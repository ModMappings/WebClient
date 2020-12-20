import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  GameVersion,
  GameVersionsService,
  MappingsService,
  MappingType,
  MappingTypesService,
  Release,
  ReleasesService
} from '../../../generated';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {distinct, filter, map, mergeMap, tap} from 'rxjs/operators';
import {SelectedMappingFilters} from '../../util/selected-mappings-filter';

@Component({
  selector: 'app-mapping-filters-selector',
  templateUrl: './mapping-filters-selector.component.html',
  styleUrls: ['./mapping-filters-selector.component.scss']
})
export class MappingFiltersSelectorComponent implements OnInit, AfterViewInit {

  @Output()
  changed = new EventEmitter<SelectedMappingFilters>();

  gameVersions: GameVersion[] | null = null;
  mappingTypes: MappingType[] | null = null;
  releases: Release[] | null = null;

  releaseControl: FormControl;
  gameVersionControl: FormControl;
  mappingTypeControl: FormControl;
  selectionFormGroup: FormGroup;

  constructor(
    private mappingTypesService: MappingTypesService,
    private gameVersionsService: GameVersionsService,
    private releasesService: ReleasesService
  ) {
    this.selectionFormGroup = new FormGroup({
      gameVersion: (this.gameVersionControl = new FormControl(null, Validators.required)),
      mappingType: (this.mappingTypeControl = new FormControl(null, Validators.required)),
      release: (this.releaseControl = new FormControl(null, Validators.nullValidator)),
    });

    this.releaseControl.disable();
    this.gameVersionControl.disable();
    this.mappingTypeControl.disable();
  }

  ngOnInit(): void {
    this.gameVersionsService.getGameVersionsBySearchCriteria().subscribe(page => {
      this.gameVersions = page?.content ?? [];
      this.gameVersionControl.enable();
    });

    this.mappingTypesService.getMappingTypesBySearchCriteria().subscribe(pmt => {
      this.mappingTypes = pmt?.content ?? [];
      this.mappingTypeControl.enable();
    });
  }

  ngAfterViewInit(): void {
    this.selectionFormGroup.valueChanges.pipe(
      filter(formData => formData.gameVersion != null && formData.mappingType != null),
      tap(formData =>
        this.changed.emit({
          gameVersion: formData.gameVersion as GameVersion | null,
          mappingType: formData.mappingType as MappingType | null,
          release: formData.release as Release | null
        })),
      map(value => ({
        gameVersion: value.gameVersion as GameVersion | null,
        mappingType: value.mappingType as MappingType | null
      })),
      distinct(),
      mergeMap(releaseFilterData => this.releasesService.getReleasesBySearchCriteria(
        undefined,
        releaseFilterData.gameVersion?.id,
        releaseFilterData.mappingType?.id,
        true,
        undefined,
        undefined,
        0,
        10000
      )),
      map(releasePage => releasePage.content ?? [])
    ).subscribe(releases => {
      this.releases = releases;
      this.releaseControl.setValue(null, {emitEvent: false, emitModelToViewChange: true, emitViewToModelChange: true});
      this.releaseControl.enable({emitEvent: false});
    });
  }

}
