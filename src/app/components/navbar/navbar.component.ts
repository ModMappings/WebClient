import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {UserData} from '../../services/user-profile';
import {ApiService} from '../../services/api.service';
import {takeUntil} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
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

  @ViewChild(SignInButtonComponent, {read: ElementRef, static: false})
  signInButtonRef: ElementRef;

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

  loggedInFabClicked() {
    const element = this.signInButtonRef.nativeElement as Element;
    const rect = element.getBoundingClientRect();
    console.log('rect', rect);
    const dialogRef = this.dialog.open(SignedInMenuComponent, {
      width: '250px',
      hasBackdrop: false,
      position: {
        left: (rect.right - 250) + 'px',
        top: (rect.top + 40) + 'px'
      }
    });
    dialogRef.componentInstance.logoutClicked.pipe(
      takeUntil(this.destroyed)
    ).subscribe(() => this.logoutClicked());
  }

  logoutClicked() {
    this.apiService.logout();
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
