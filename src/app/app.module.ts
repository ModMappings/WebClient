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
import {MatProgressBarModule, MatProgressSpinnerModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {AuthModule, AuthWellKnownEndpoints, OidcConfigService, OidcSecurityService, OpenIdConfiguration} from 'angular-auth-oidc-client';

export function loadOidcConfig(service: OidcConfigService) {
  return () => service.load_using_stsServer('http://localhost:8081/auth/realms/ModMappings');
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
    [
      OidcConfigService,
      {
        provide: APP_INITIALIZER,
        useFactory: loadOidcConfig,
        deps: [OidcConfigService],
        multi: true
      }
    ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(oidcSecurityService: OidcSecurityService, oidcConfigService: OidcConfigService) {
    oidcConfigService.onConfigurationLoaded.subscribe(configResult => {
      const config: OpenIdConfiguration = {
        stsServer: configResult.customConfig.stsServer,
        redirect_url: 'http://localhost:4200',
        client_id: 'web_frontend',
        response_type: 'code',
        scope: 'openid',
        post_logout_redirect_uri: 'http://localhost:4200/',
        start_checksession: false,
        silent_renew: true,
        silent_renew_url: 'http://localhost:4200/silent-renew.html',
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
    });
  }

}
