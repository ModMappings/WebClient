import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {UserData} from '../../services/user-profile';
import {ApiService} from '../../services/api.service';
import {takeUntil} from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {SignedInMenuComponent} from '../signed-in-menu/signed-in-menu.component';
import {SignInButtonComponent} from '../sign-in-button/sign-in-button.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private destroyed = new Subject();
  userData: UserData | null = null;
  userInitials: string | null = null;
  signedIn = false;
  showSignedInMenu = false;

  @ViewChild(SignInButtonComponent, { read: ElementRef })
  signInButtonRef: ElementRef;

  @ViewChild('loggedInMenu')
  loggedInMenuRef: TemplateRef<any>;

  private openSignInMenuDialog: MatDialogRef<any> | null = null;

  constructor(private apiService: ApiService, private readonly dialog: MatDialog) {
  }

  ngOnInit() {
    this.apiService.userData.pipe(
      takeUntil(this.destroyed)
    ).subscribe(userData => {
      this.userData = userData;
      this.signedIn = userData != null;
      if (userData == null) {
        this.showSignedInMenu = false;
      }
      this.userInitials = userData == null ? null : userData.name.substr(0, 1);
    });
  }

  private closeSignInDialog() {
    if (this.openSignInMenuDialog != null) {
      this.openSignInMenuDialog.close();
      return true;
    } else {
      return false;
    }
  }

  loggedInFabClicked() {
    if (!this.closeSignInDialog()) {
      const element = this.signInButtonRef.nativeElement as Element;
      const rect = element.getBoundingClientRect();
      this.openSignInMenuDialog = this.dialog.open(this.loggedInMenuRef, {
        hasBackdrop: true,
        backdropClass: '__dummy__', // adding a dummy class here removes the default opacity effect
        position: {
          right: (document.documentElement.clientWidth - rect.right) + 'px',
          top: (rect.top + 40) + 'px'
        }
      });
      this.openSignInMenuDialog.beforeClosed().pipe(
        takeUntil(this.destroyed)
      ).subscribe(() => this.openSignInMenuDialog = null);
    }
  }

  logoutClicked() {
    this.closeSignInDialog();
    this.apiService.logout();
  }

  ngOnDestroy(): void {
    this.closeSignInDialog();
    this.destroyed.next();
    this.destroyed.complete();
  }

}
