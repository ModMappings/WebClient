import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

export type AppTheme = 'light' | 'dark';

@Injectable()
export class ThemeService {

  private readonly theme$ = new BehaviorSubject<AppTheme>('light');

  get theme(): Observable<AppTheme> {
    return this.theme$;
  }

  setTheme(theme: AppTheme) {
    this.theme$.next(theme);
  }
}
