import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from '../../../services/search.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit, OnDestroy {

  private destroyed$ = new Subject();

  searchValue: string | null = null;

  constructor(public searchService: SearchService) {
  }

  ngOnInit() {
    this.searchService.currentSearchValue.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(searchValue => this.searchValue = searchValue);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
