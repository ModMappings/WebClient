import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HomeModule} from './pages/home/home.module';
import {GameVersionsService} from './services/game-versions.service';
import {ComponentsModule} from './components/components.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ThemeService} from './services/theme.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthModule, OidcConfigService, OidcSecurityService, OpenIdConfiguration} from 'angular-auth-oidc-client';
import {environment} from '../environments/environment';
import {AddOidcTokenInterceptor} from './services/add-oidc-token.interceptor';
import {BASE_PATH} from '../generated';
import { ClassNamePipe } from './pipes/class-name/class-name.pipe';

export function loadOidcConfig(service: OidcConfigService) {
  return async () => {
    try {
      if (!await service.load_using_stsServer(environment.openIdServer)) {
        console.error('Failed to load OpenID config');
      }
    } catch (e) {
      console.error('Failed to load OpenID config', e);
    }
  };
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,

    AuthModule.forRoot(),

    NgbModule,
    ComponentsModule,
    BrowserAnimationsModule,

    HomeModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  providers: [
    GameVersionsService,
    ThemeService,
    {
      provide: BASE_PATH,
      useValue: environment.apiBaseUrl
    },
    [
      OidcConfigService,
      {
        provide: APP_INITIALIZER,
        useFactory: loadOidcConfig,
        deps: [OidcConfigService],
        multi: true
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AddOidcTokenInterceptor,
        multi: true
      }
    ],
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(oidcSecurityService: OidcSecurityService, oidcConfigService: OidcConfigService) {
    oidcConfigService.onConfigurationLoaded.subscribe(configResult => {
      if (configResult != null) {
        const config: OpenIdConfiguration = {
          stsServer: configResult.customConfig.stsServer,
          redirect_url: `${environment.publicUrl}/`,
          client_id: environment.openIdClientId,
          response_type: 'code',
          scope: 'openid',
          post_logout_redirect_uri: `${environment.publicUrl}/`,
          start_checksession: false,
          silent_renew: true,
          silent_renew_url: `${environment.publicUrl}/silent-renew.html`,
          post_login_route: '/',

          forbidden_route: '/',
          // HTTP 401
          unauthorized_route: '/',
          log_console_warning_active: true,
          log_console_debug_active: false,
          // id_token C8: The iat Claim can be used to reject tokens that were issued too far away from the current time,
          // limiting the amount of time that nonces need to be stored to prevent attacks.The acceptable range is Client specific.
          max_id_token_iat_offset_allowed_in_seconds: 10,
        };

        oidcSecurityService.setupModule(config, configResult.authWellknownEndpoints);
      }
    });
  }

}
