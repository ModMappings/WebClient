import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Subject} from 'rxjs';
import {UserData} from '../../services/user-profile';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-sign-in-button',
  templateUrl: './sign-in-button.component.html',
  styleUrls: ['./sign-in-button.component.scss']
})
export class SignInButtonComponent implements OnInit, OnDestroy {

  @Output() userFabClicked = new EventEmitter<void>();

  private destroyed = new Subject();
  userData: UserData | null = null;
  userInitials: string | null = null;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.userData.pipe(
      takeUntil(this.destroyed)
    ).subscribe(userData => {
      this.userData = userData;
      this.userInitials = userData == null ? null : userData.name.substr(0, 1);
    });
  }

  login() {
    this.apiService.login();
  }

  clickUserFab() {
    this.userFabClicked.emit();
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
