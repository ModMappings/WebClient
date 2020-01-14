import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LocalStorageHandle, LocalStorageService} from './local-storage.service';

export type AppTheme = 'light' | 'dark';

@Injectable()
export class ThemeService {

  private readonly localStorageHandle: LocalStorageHandle<AppTheme>;

  constructor(localStorageService: LocalStorageService) {
    this.localStorageHandle = localStorageService.createHandle(
      'theme',
      encoded => encoded === 'light' || encoded === 'dark' ? encoded : 'light',
      theme => theme
    );
  }

  get theme(): Observable<AppTheme> {
    return this.localStorageHandle.value$;
  }

  setTheme(theme: AppTheme) {
    this.localStorageHandle.value = theme;
  }
}
