import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameVersionsSelectorComponent} from './game-versions-selector/game-versions-selector.component';
import {MatButtonModule} from '@angular/material/button';
import {ThemeSelectorComponent} from './theme-selector/theme-selector.component';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {GlobalSearchBoxComponent} from './global-search-box/global-search-box.component';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {NavbarComponent} from './navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {PackageTreeComponent} from './package-tree/package-tree.component';
import {MatCardModule, MatDialogModule, MatTreeModule} from '@angular/material';
import {SignInButtonComponent} from './sign-in-button/sign-in-button.component';
import {SignedInMenuComponent} from './signed-in-menu/signed-in-menu.component';


@NgModule({
  declarations: [
    GameVersionsSelectorComponent,
    ThemeSelectorComponent,
    GlobalSearchBoxComponent,
    NavbarComponent,
    PackageTreeComponent,
    SignInButtonComponent,
    SignedInMenuComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    MatMenuModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatToolbarModule,
    RouterModule,
    MatIconModule,
    MatTreeModule,
    MatCardModule,
    MatDialogModule
  ],
  exports: [
    GameVersionsSelectorComponent,
    ThemeSelectorComponent,
    GlobalSearchBoxComponent,
    NavbarComponent,
    PackageTreeComponent
  ],
  entryComponents: [
    SignedInMenuComponent,
  ]
})
export class ComponentsModule {
}
