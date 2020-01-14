import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameVersionsSelectorComponent} from './game-versions-selector/game-versions-selector.component';
import {MatButtonModule} from '@angular/material/button';
import { ThemeSelectorComponent } from './theme-selector/theme-selector.component';
import {MatSelectModule} from "@angular/material/select";
import {MatMenuModule} from "@angular/material/menu";


@NgModule({
  declarations: [GameVersionsSelectorComponent, ThemeSelectorComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    MatMenuModule
  ],
  exports: [
    GameVersionsSelectorComponent,
    ThemeSelectorComponent
  ]
})
export class ComponentsModule { }
