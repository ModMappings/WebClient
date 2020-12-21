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
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTreeModule } from '@angular/material/tree';
import {SignInButtonComponent} from './sign-in-button/sign-in-button.component';
import {SignedInMenuComponent} from './signed-in-menu/signed-in-menu.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { MappingDetailViewComponent } from './mapping-detail-view/mapping-detail-view.component';
import { MappingFiltersSelectorComponent } from './mapping-filters-selector/mapping-filters-selector.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ClassSelectorComponent } from './class-selector/class-selector.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatListModule} from '@angular/material/list';
import { PackageTreeSideNavComponent } from './package-tree-side-nav/package-tree-side-nav.component';
import { TabbedSidenavDrawerComponent } from './tabbed-sidenav-drawer/tabbed-sidenav-drawer.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ClassSelectorSideNavComponent } from './class-selector-side-nav/class-selector-side-nav.component';
import { ClassViewerComponent } from './class-viewer/class-viewer.component';
import {ClassNamePipe} from '../pipes/class-name/class-name.pipe';
import { MethodViewerComponent } from './method-viewer/method-viewer.component';
import { FieldViewerComponent } from './field-viewer/field-viewer.component';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    GameVersionsSelectorComponent,
    ThemeSelectorComponent,
    GlobalSearchBoxComponent,
    NavbarComponent,
    PackageTreeComponent,
    SignInButtonComponent,
    SignedInMenuComponent,
    LoadingSpinnerComponent,
    MappingDetailViewComponent,
    MappingFiltersSelectorComponent,
    ClassSelectorComponent,
    PackageTreeSideNavComponent,
    TabbedSidenavDrawerComponent,
    ClassSelectorSideNavComponent,
    ClassViewerComponent,
    ClassNamePipe,
    MethodViewerComponent,
    FieldViewerComponent
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
    MatDialogModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    ScrollingModule,
    MatListModule,
    MatSidenavModule,
    MatTooltipModule
  ],
  exports: [
    GameVersionsSelectorComponent,
    ThemeSelectorComponent,
    GlobalSearchBoxComponent,
    NavbarComponent,
    PackageTreeComponent,
    LoadingSpinnerComponent,
    MappingDetailViewComponent,
    MappingFiltersSelectorComponent,
    ClassSelectorComponent,
    PackageTreeSideNavComponent,
    ClassSelectorSideNavComponent,
    ClassNamePipe,
    ClassViewerComponent
  ],
  entryComponents: [
    SignedInMenuComponent,
  ]
})
export class ComponentsModule {
}
