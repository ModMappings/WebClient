import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {DetailedMapping, MappableType, Mapping, MappingsService, VersionedMappable, VersionedMappablesService} from '../../../generated';
import {getAllPages} from '../../util/observable-functions';
import {forkJoin, of, SubscriptionLike} from 'rxjs';
import {map, mergeAll, mergeMap, switchMap, take, toArray} from 'rxjs/operators';
import {SelectedMappingFilters} from '../../util/selected-mappings-filter';

@Component({
  selector: 'app-class-viewer',
  templateUrl: './class-viewer.component.html',
  styleUrls: ['./class-viewer.component.scss']
})
export class ClassViewerComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  selectionFilters: SelectedMappingFilters | null = null;

  @Input()
  mapping: DetailedMapping | null;

  methods: DetailedMapping[] = [];
  fields: DetailedMapping[] = [];

  loadingMethods = true;
  loadingFields = true;

  private initialized = false;
  private getMethodsSubscription: SubscriptionLike | null;
  private getFieldsSubscription: SubscriptionLike | null;

  constructor(
    private mappingsService: MappingsService
  ) { }

  ngOnInit(): void {
    this.loadMethods();
    this.loadFields();
    this.initialized = true;
  }

  ngOnDestroy(): void {
    this.getMethodsSubscription?.unsubscribe();
    this.getFieldsSubscription?.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.initialized)
    {
      return;
    }

    this.ngOnInit();
  }

  private loadMethods() {
    this.getMethodsSubscription?.unsubscribe();
    this.loadingMethods = true;
    this.getMethodsSubscription = this.mappingsService.getDetailedMappingsBySearchCriteria(      {
        latestOnly: true,
        releaseId: this.selectionFilters?.release?.id,
        mappableType: MappableType.METHOD,
        mappingTypeId: this.mapping?.mappingDTO?.mappingTypeId,
        gameVersionId: this.mapping?.versionedMappable?.gameVersionId,
        parentClassId: this.mapping?.versionedMappable?.id
      }
    ).pipe(
      getAllPages(pageIndex =>
        this.mappingsService.getDetailedMappingsBySearchCriteria(      {
            latestOnly: true,
            releaseId: this.selectionFilters?.release?.id,
            mappableType: MappableType.FIELD,
            mappingTypeId: this.mapping?.mappingDTO?.mappingTypeId,
            gameVersionId: this.mapping?.versionedMappable?.gameVersionId,
            parentClassId: this.mapping?.versionedMappable?.id,
            page: pageIndex
          }
        )
      ),
      take(1),
    ).subscribe(methods => {
      this.getMethodsSubscription?.unsubscribe();
      this.loadingMethods = false;
      this.methods = methods.sort((a, b) => a.mappingDTO?.output?.localeCompare(b.mappingDTO?.output ?? "") ?? 0);
    });
  }

  private loadFields() {
    this.getFieldsSubscription?.unsubscribe();
    this.loadingFields = true;
    this.getFieldsSubscription = this.mappingsService.getDetailedMappingsBySearchCriteria(
      {
        latestOnly: true,
        releaseId: this.selectionFilters?.release?.id,
        mappableType: MappableType.FIELD,
        mappingTypeId: this.mapping?.mappingDTO?.mappingTypeId,
        gameVersionId: this.mapping?.versionedMappable?.gameVersionId,
        parentClassId: this.mapping?.versionedMappable?.id
      }
    ).pipe(
      getAllPages(pageIndex =>
        this.mappingsService.getDetailedMappingsBySearchCriteria(
          {
            latestOnly: true,
            releaseId: this.selectionFilters?.release?.id,
            mappableType: MappableType.FIELD,
            mappingTypeId: this.mapping?.mappingDTO?.mappingTypeId,
            gameVersionId: this.mapping?.versionedMappable?.gameVersionId,
            parentClassId: this.mapping?.versionedMappable?.id,
            page: pageIndex
          }
        )
      ),
      take(1),
    ).subscribe(fields => {
      this.getFieldsSubscription?.unsubscribe();
      this.loadingFields = false;
      this.fields = fields.sort((a, b) => a.mappingDTO?.output?.localeCompare(b.mappingDTO?.output ?? "") ?? 0);;
    });
  }

  canDisplay(): boolean {
    return this.mapping != null && this.mapping.mappable?.type === MappableType.CLASS;
  }
}
