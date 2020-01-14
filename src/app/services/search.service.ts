import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';
import {distinctUntilChanged, share, shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private currentSearchValue$ = new BehaviorSubject<string | null>(null);
  currentSearchValue = this.currentSearchValue$.pipe(
    distinctUntilChanged(),
    shareReplay(1)
  );

  constructor(private router: Router) {
    router.events.subscribe(event => {
      console.log('hi?', event.constructor.name, event);
      if (event instanceof NavigationEnd) {
        let nextValue;
        if (/^\/search/.test(event.url)) {
          const parsed = new URL(event.url, window.location.origin);
          if (parsed.pathname === '/search') {
            const value = parsed.searchParams.get('q');
            nextValue = value === '' ? null : value;
          } else {
            nextValue = null;
          }
        } else {
          nextValue = null;
        }
        this.currentSearchValue$.next(nextValue);
      }
    });
  }

  search(value: string | null) {
    this.router.navigate(['/search'], {
      queryParams: {q: value}
    });
  }

  fetchSuggestions(value: string): Observable<string[]> {
    const values = ['Hello', 'World', 'func_1234_a'];
    return of(
      values.filter(v => v.toLocaleLowerCase().startsWith(value.toLocaleLowerCase()))
    );
  }

}
