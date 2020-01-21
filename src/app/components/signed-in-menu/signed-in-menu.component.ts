import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-signed-in-menu',
  templateUrl: './signed-in-menu.component.html',
  styleUrls: ['./signed-in-menu.component.scss']
})
export class SignedInMenuComponent {

  @Output() logoutClicked = new EventEmitter<void>();

}
