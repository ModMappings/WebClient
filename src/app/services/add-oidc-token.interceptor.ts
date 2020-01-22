import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {OidcSecurityService} from 'angular-auth-oidc-client';

@Injectable()
export class AddOidcTokenInterceptor implements HttpInterceptor {

  private oidcSecurityService: OidcSecurityService;

  // have to use Injector to avoid cyclic dependency
  constructor(private injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let finalRequest = req;
    if (req.method === 'GET' && req.url.startsWith(environment.apiBaseUrl)) {
      if (this.oidcSecurityService == null) {
        this.oidcSecurityService = this.injector.get(OidcSecurityService);
      }
      const token = this.oidcSecurityService.getToken();
      if (token !== '') {
        console.log('adding token header to request to ', req.url);
        finalRequest = req.clone({
          setHeaders: {Authorization: `Bearer ${token}`}
        });
      }
    }
    return next.handle(finalRequest);
  }

}
