import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
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
import {AuthModule, AuthWellKnownEndpoints, OidcSecurityService, OpenIdConfiguration} from 'angular-auth-oidc-client';

// const oidcConfigUrl = 'assets/auth.clientConfiguration.json';
//
// export function loadOidcConfig(service: OidcConfigService) {
//   return () => service.load(oidcConfigUrl);
// }

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
    // [
    //   OidcConfigService,
    //   {
    //     provide: APP_INITIALIZER,
    //     useFactory: loadOidcConfig,
    //     deps: [OidcConfigService],
    //     multi: true
    //   }
    // ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(oidcSecurityService: OidcSecurityService) {
    const config: OpenIdConfiguration = {
      stsServer: 'http://localhost:8081',
      redirect_url: 'http://localhost:4200',
      // The Client MUST validate that the aud (audience) Claim contains its client_id value registered at the Issuer identified by the iss (issuer) Claim as an audience.
      // The ID Token MUST be rejected if the ID Token does not list the Client as a valid audience, or if it contains additional audiences not trusted by the Client.
      client_id: 'web_frontend',
      response_type: 'code', // 'id_token token' Implicit Flow
      scope: 'dataEventRecords openid',
      post_logout_redirect_uri: 'http://localhost:4200/',
      start_checksession: false,
      silent_renew: true,
      silent_renew_url: 'http://localhost:4200/silent-renew.html',
      post_login_route: '/',

      forbidden_route: '/',
      // HTTP 401
      unauthorized_route: '/',
      log_console_warning_active: true,
      log_console_debug_active: true,
      // id_token C8: The iat Claim can be used to reject tokens that were issued too far away from the current time,
      // limiting the amount of time that nonces need to be stored to prevent attacks.The acceptable range is Client specific.
      max_id_token_iat_offset_allowed_in_seconds: 10,
    };

    const baseUrl = 'http://localhost:8081/auth';

    const authWellKnownEndpoints: AuthWellKnownEndpoints = {
      issuer: `${baseUrl}/realms/ModMappings`,
      authorization_endpoint: `${baseUrl}/realms/ModMappings/protocol/openid-connect/auth`,
      token_endpoint: `${baseUrl}/realms/ModMappings/protocol/openid-connect/token`,
      userinfo_endpoint: `${baseUrl}/realms/ModMappings/protocol/openid-connect/userinfo`,
      end_session_endpoint: `${baseUrl}/realms/ModMappings/protocol/openid-connect/logout`,
      introspection_endpoint: `${baseUrl}/realms/ModMappings/protocol/openid-connect/token/introspect`,
      jwks_uri: `${baseUrl}/realms/ModMappings/protocol/openid-connect/certs`
    };

    oidcSecurityService.setupModule(config, authWellKnownEndpoints);
  }

}
