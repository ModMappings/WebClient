import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SelectedMappingFilters} from '../../util/selected-mappings-filter';
import {DetailedMapping, MappableType, MappingsService} from '../../../generated';
import {SubscriptionLike} from 'rxjs';
import {getAllPages} from '../../util/observable-functions';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-method-viewer',
  templateUrl: './method-viewer.component.html',
  styleUrls: ['./method-viewer.component.scss']
})
export class MethodViewerComponent implements OnInit, OnDestroy {

  @Input()
  selectionFilters: SelectedMappingFilters | null = null;

  @Input()
  mapping: DetailedMapping | null;

  parameters: DetailedMapping[] = [];

  loadingParameters = true;

  private getParametersSubscription: SubscriptionLike | null;

  constructor(
    private mappingsService: MappingsService
  ) { }

  ngOnInit(): void {
    this.loadParameters();
  }

  ngOnDestroy(): void {
    this.getParametersSubscription?.unsubscribe();
  }

  private loadParameters() {
    this.getParametersSubscription?.unsubscribe();
    this.loadingParameters = true;
    this.getParametersSubscription = this.mappingsService.getDetailedMappingsBySearchCriteria(
      {
        latestOnly: true,
        releaseId: this.selectionFilters?.release?.id,
        mappableType: MappableType.PARAMETER,
        mappingTypeId: this.mapping?.mappingDTO?.mappingTypeId,
        gameVersionId: this.mapping?.versionedMappable?.gameVersionId,
        parentMethodId: this.mapping?.versionedMappable?.id
      }
    ).pipe(
      getAllPages(pageIndex =>
        this.mappingsService.getDetailedMappingsBySearchCriteria(
          {
            latestOnly: true,
            releaseId: this.selectionFilters?.release?.id,
            mappableType: MappableType.PARAMETER,
            mappingTypeId: this.mapping?.mappingDTO?.mappingTypeId,
            gameVersionId: this.mapping?.versionedMappable?.gameVersionId,
            parentMethodId: this.mapping?.versionedMappable?.id,
            page: pageIndex
          }
        )
      ),
      take(1),
    ).subscribe(parameters => {
      this.getParametersSubscription?.unsubscribe();
      this.loadingParameters = false;
      this.parameters = parameters.sort((a, b) => a.mappingDTO?.output?.localeCompare(b.mappingDTO?.output ?? "") ?? 0);;
    });
  }

  canDisplay(): boolean {
    return this.mapping != null && this.mapping.mappable?.type === MappableType.METHOD;
  }
}
