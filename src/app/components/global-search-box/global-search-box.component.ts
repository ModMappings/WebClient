import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, switchMap} from 'rxjs/operators';
import {SearchService} from '../../services/search.service';

@Component({
  selector: 'app-global-search-box',
  templateUrl: './global-search-box.component.html',
  styleUrls: ['./global-search-box.component.scss']
})
export class GlobalSearchBoxComponent implements OnInit {

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
  }
}
