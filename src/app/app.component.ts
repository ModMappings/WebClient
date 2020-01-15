import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppTheme, ThemeService} from './services/theme.service';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {debounceTime, switchMap, takeUntil} from 'rxjs/operators';

const themeToClassMap: Record<AppTheme, string | null> = {
  light: null,
  dark: 'app-dark-theme'
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private destroyed$ = new Subject();
  routeLoading = false;

  private currentTheme: AppTheme | null = null;

  constructor(private readonly themeService: ThemeService, private router: Router) {
  }

  private static unapplyTheme(theme: AppTheme) {
    const className = themeToClassMap[theme];
    if (className != null) {
      document.documentElement.classList.remove(className);
    }
  }

  private static applyTheme(theme: AppTheme) {
    const className = themeToClassMap[theme];
    if (className != null) {
      document.documentElement.classList.add(className);
    }
  }

  ngOnInit(): void {
    this.themeService.theme.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(nextTheme => {
      if (this.currentTheme != null) {
        AppComponent.unapplyTheme(this.currentTheme);
      }
      this.currentTheme = nextTheme;
      AppComponent.applyTheme(nextTheme);
    });

    this.router.events.pipe(
      switchMap(evt => {
        if (evt instanceof NavigationStart) {
          return [true];
        } else if (evt instanceof NavigationEnd) {
          return [false];
        } else {
          return [];
        }
      }),
      debounceTime(20),
      takeUntil(this.destroyed$)
    ).subscribe(loading => this.routeLoading = loading);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  setTheme(theme: AppTheme) {
    this.themeService.setTheme(theme);
  }

}
