import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {UserData} from '../../services/user-profile';

@Component({
  selector: 'app-signed-in-menu',
  templateUrl: './signed-in-menu.component.html',
  styleUrls: ['./signed-in-menu.component.scss']
})
export class SignedInMenuComponent {

  @Output() logoutClicked = new EventEmitter<void>();

  @Input() username: string;

  // constructor(@Inject(MAT_DIALOG_DATA) userData: UserData) {
  //   this.username = userData.name;
  // }
}
