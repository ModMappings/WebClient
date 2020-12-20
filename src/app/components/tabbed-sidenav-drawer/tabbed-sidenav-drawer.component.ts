import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tabbed-sidenav-drawer',
  templateUrl: './tabbed-sidenav-drawer.component.html',
  styleUrls: ['./tabbed-sidenav-drawer.component.scss']
})
export class TabbedSidenavDrawerComponent implements OnInit {

  @Input()
  tabStyle = {};

  @Input()
  opened = false;

  constructor() { }

  ngOnInit(): void {
  }

}
