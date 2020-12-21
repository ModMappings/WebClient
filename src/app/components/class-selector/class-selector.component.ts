import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MappableType, Mapping, MappingsService} from '../../../generated';
import {Observable, of, SubscriptionLike} from 'rxjs';
import {SelectedMappingFilters} from '../../util/selected-mappings-filter';
import {getAllPages} from '../../util/observable-functions';

@Component({
  selector: 'app-class-selector',
  templateUrl: './class-selector.component.html',
  styleUrls: ['./class-selector.component.scss']
})
export class ClassSelectorComponent implements OnInit, OnChanges {

  @Input()
  packageName = '';

  @Input()
  selectionFilters: SelectedMappingFilters | null = null;

  @Output()
  classSelected: EventEmitter<Mapping> = new EventEmitter<Mapping>();

  selectableClasses: Mapping[] = [];

  initialized = false;
  loading = false;

  private pullMappingSubscription: SubscriptionLike | null = null;

  constructor(
    private mappingService: MappingsService
  ) {
  }

  ngOnInit(): void {
    this.initialized = true;
    this.loading = true;
    this.getAllMappingsInPackage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.initialized) {
      return;
    }

    if ((changes.packageName != null && changes.packageName.currentValue !== changes.packageName.previousValue) ||
      (changes.selectionFilters != null && changes.selectionFilters.currentValue !== changes.selectionFilters.previousValue))
    {
      this.loading = true;
      this.pullMappingSubscription?.unsubscribe();
      this.getAllMappingsInPackage();
    }
  }

  private getAllMappingsInPackage() {
    this.pullMappingSubscription =
      this.getClassMappingsInPackage()
        .subscribe(classes => {
          this.selectableClasses = classes.sort(((a, b) => a.output?.localeCompare(b.output ?? "") ?? 0));
          this.loading = false;
          this.pullMappingSubscription?.unsubscribe();
        });
  }

  private getClassMappingsInPackage(): Observable<Mapping[]> {
    if (this.packageName === '') {
      return of([]);
    }

    return this.mappingService.getMappingsBySearchCriteria(
      {
        latestOnly: true,
        releaseId: this.selectionFilters?.release?.id,
        mappableType: MappableType.CLASS,
        outputRegex: `${this.packageName}/[a-zA-Z_]+`,
        mappingTypeId: this.selectionFilters?.mappingType?.id,
        gameVersionId: this.selectionFilters?.gameVersion?.id
      }
    ).pipe(
      getAllPages(pageIndex =>
        this.mappingService.getMappingsBySearchCriteria(
          {
            latestOnly: true,
            releaseId: this.selectionFilters?.release?.id,
            mappableType: MappableType.CLASS,
            outputRegex: `${this.packageName}/[a-zA-Z_]+`,
            mappingTypeId: this.selectionFilters?.mappingType?.id,
            gameVersionId: this.selectionFilters?.gameVersion?.id,
            page: pageIndex
          }
        )
      )
    );
  }

  onClassSelected(mapping: Mapping) {
    this.classSelected.emit(mapping);
  }
}
