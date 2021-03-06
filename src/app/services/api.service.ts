import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {Observable, Subject} from 'rxjs';
import {UserData} from './user-profile';
import {map, shareReplay} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private loginErrors$ = new Subject<string>();

  loginErrors: Observable<string> = this.loginErrors$;
  userData: Observable<UserData | null>;

  constructor(private http: HttpClient, private oidcSecurityService: OidcSecurityService) {
    this.userData = oidcSecurityService.getIsAuthorized().pipe(
      map(authorized => {
        if (authorized) {
          return {
            name: oidcSecurityService.getPayloadFromIdToken()['preferred_username']
          };
        } else {
          return null;
        }
      }),
      shareReplay(1)
    );
  }

  login() {
    if (!this.oidcSecurityService.moduleSetup) {
      this.loginErrors$.next('Login Service seems to be down. Please try again later.');
    } else {
      this.oidcSecurityService.authorize();
    }
  }

  logout() {
    this.oidcSecurityService.logoff();
  }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${environment.apiBaseUrl}${url}`);
  }

}
