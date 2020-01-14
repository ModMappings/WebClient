import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameVersionsSelectorComponent} from './game-versions-selector/game-versions-selector.component';
import {MatButtonModule} from '@angular/material/button';
import { ThemeSelectorComponent } from './theme-selector/theme-selector.component';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import { GlobalSearchBoxComponent } from './global-search-box/global-search-box.component';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


@NgModule({
  declarations: [GameVersionsSelectorComponent, ThemeSelectorComponent, GlobalSearchBoxComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    MatMenuModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule
  ],
  exports: [
    GameVersionsSelectorComponent,
    ThemeSelectorComponent,
    GlobalSearchBoxComponent
  ]
})
export class ComponentsModule { }
