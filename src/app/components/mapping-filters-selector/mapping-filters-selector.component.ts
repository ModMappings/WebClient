import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  GameVersion,
  GameVersionsService, Mapping,
  MappingsService,
  MappingType,
  MappingTypesService,
  Release,
  ReleasesService
} from '../../../generated';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {distinct, filter, map, mergeMap, tap} from 'rxjs/operators';
import {SelectedMappingFilters} from '../../util/selected-mappings-filter';
import {getAllPages} from '../../util/observable-functions';

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

  selectedGameVersion: GameVersion | null;
  selectedMappingType: MappingType | null;

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
    this.gameVersionsService.getGameVersionsBySearchCriteria({})
      .pipe(
        getAllPages(pageIndex => this.gameVersionsService.getGameVersionsBySearchCriteria({page: pageIndex}))
      )
      .subscribe(gameVersions => {
        this.gameVersions = gameVersions;
        this.gameVersionControl.enable();
      });

    this.mappingTypesService.getMappingTypesBySearchCriteria({})
      .pipe(
        getAllPages(pageIndex => this.mappingTypesService.getMappingTypesBySearchCriteria({page: pageIndex}))
      )
      .subscribe(mappingTypes => {
        this.mappingTypes = mappingTypes;
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
      filter(data => data.mappingType != this.selectedMappingType || data.gameVersion != this.selectedGameVersion),
      tap(data => {
        this.selectedMappingType = data.mappingType;
        this.selectedGameVersion = data.gameVersion;
      }),
      mergeMap(releaseFilterData => this.releasesService.getReleasesBySearchCriteria({
          gameVersion: releaseFilterData.gameVersion?.id,
          mappingType: releaseFilterData.mappingType?.id,
        }
        ).pipe(
        getAllPages(pageIndex => this.releasesService.getReleasesBySearchCriteria({
            gameVersion: releaseFilterData.gameVersion?.id,
            mappingType: releaseFilterData.mappingType?.id,
            page: pageIndex
          }
        ))
        )
      ),
    ).subscribe(releases => {
      this.releases = releases;
      this.releaseControl.setValue(null, {emitEvent: false, emitModelToViewChange: true, emitViewToModelChange: true});
      this.releaseControl.enable({emitEvent: false});
    });
  }

}
