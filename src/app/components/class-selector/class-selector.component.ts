import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MappableType, Mapping, MappingsService} from '../../../generated';
import {Observable, of, SubscriptionLike} from 'rxjs';
import {SelectedMappingFilters} from '../../util/selected-mappings-filter';
import {map, mergeMap} from 'rxjs/operators';

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
  classSelected: EventEmitter<string> = new EventEmitter<string>();

  selectedClasses: string[] = [];

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
      this.getClassMappingsInPackage(0)
        .pipe(
          map(mappings => {
            return mappings.map(mapping => {
              return mapping.output ?? '';
            })
            .filter(mapping => mapping !== '')
            .map(mapping => {
              return mapping.substr(mapping.lastIndexOf('/') + 1);
            });
          })
        )
        .subscribe(classes => {
          this.selectedClasses = classes;
          this.loading = false;
          this.pullMappingSubscription?.unsubscribe();
        });
  }

  private getClassMappingsInPackage(page: number): Observable<Mapping[]> {
    if (this.packageName === '') {
      return of([]);
    }

    return this.mappingService.getMappingsBySearchCriteria(
      true,
      undefined,
      this.selectionFilters?.release?.id,
      MappableType.CLASS,
      undefined,
      `${this.packageName}/[a-zA-Z_]+`,
      this.selectionFilters?.mappingType?.id,
      this.selectionFilters?.gameVersion?.id,
      undefined,
      page
    ).pipe(
      mergeMap(currentPage => {
        if (currentPage.last) {
          return of(currentPage.content);
        }

        const content = currentPage.content ?? [];
        const currentPageNumber = currentPage.number ?? 0;
        return this.getClassMappingsInPackage(currentPageNumber + 1)
          .pipe(
            map(additionalPage => {
              return [...content, ...additionalPage];
            })
          );
      }),
      map(packages => {
        if (packages === undefined) {
          return [];
        }

        return packages;
      }));
  }
}
