import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() {
  }

  fetchSuggestions(value: string): Observable<string[]> {
    const values = ['Hello', 'World', 'func_1234_a'];
    return of(
      values.filter(v => v.toLocaleLowerCase().startsWith(value.toLocaleLowerCase()))
    );
  }

}
