import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {Observable} from 'rxjs';
import {UserData} from './user-profile';
import {map, shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

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
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff();
  }

}
