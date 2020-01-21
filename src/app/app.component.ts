import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppTheme, ThemeService} from './services/theme.service';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {debounceTime, switchMap, takeUntil} from 'rxjs/operators';
import {OidcSecurityService, TokenHelperService} from 'angular-auth-oidc-client';

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

  isAuthenticated: boolean;
  userData: any;

  private destroyed$ = new Subject();
  routeLoading = false;

  private currentTheme: AppTheme | null = null;

  constructor(
    private readonly themeService: ThemeService,
    private readonly router: Router,
    private readonly oidcSecurityService: OidcSecurityService,
    private readonly tokenHelperService: TokenHelperService
  ) {
    if (oidcSecurityService.moduleSetup) {
      this.doCallbackLogicIfRequired();
    } else {
      oidcSecurityService.onModuleSetup.subscribe(() => this.doCallbackLogicIfRequired());
    }
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

  private doCallbackLogicIfRequired() {
    console.log('callback logic?', window.location.toString());
    // Will do a callback, if the url has a code and state parameter.
    this.oidcSecurityService.authorizedCallbackWithCode(window.location.toString());
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

    this.oidcSecurityService.getIsAuthorized().subscribe(auth => {
      this.isAuthenticated = auth;
      if (auth) {
        const accessToken = this.oidcSecurityService.getToken();
        this.userData = this.tokenHelperService.getPayloadFromToken(accessToken, false);
      } else {
        this.userData = {};
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  setTheme(theme: AppTheme) {
    this.themeService.setTheme(theme);
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff();
  }

}
