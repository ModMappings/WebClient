import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameVersionsSelectorComponent} from './game-versions-selector/game-versions-selector.component';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [GameVersionsSelectorComponent],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    GameVersionsSelectorComponent
  ]
})
export class ComponentsModule { }
