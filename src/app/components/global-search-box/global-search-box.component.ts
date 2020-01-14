import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, switchMap, takeUntil} from 'rxjs/operators';
import {SearchService} from '../../services/search.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-global-search-box',
  templateUrl: './global-search-box.component.html',
  styleUrls: ['./global-search-box.component.scss']
})
export class GlobalSearchBoxComponent implements OnInit, OnDestroy {

  private destroyed$ = new Subject();

  searchField: AbstractControl;
  searchForm: FormGroup;

  suggestions: string[] = [];

  constructor(private formBuilder: FormBuilder, private searchService: SearchService) {
    this.searchField = this.formBuilder.control('');
    this.searchForm = this.formBuilder.group({
      search: this.searchField
    });
  }

  ngOnInit() {
    this.searchField.valueChanges.pipe(
      debounceTime(500),
      switchMap(value => this.searchService.fetchSuggestions(value))
    ).subscribe((suggestions) => {
      this.suggestions = suggestions;
    });

    this.searchService.currentSearchValue.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(value => {
      this.searchField.setValue(value || '');
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  submit() {
    this.searchService.search(this.searchField.value === '' ? null : this.searchField.value);
  }
}
