import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HomeModule} from './pages/home/home.module';
import {SearchModule} from './pages/search/search.module';
import {GameVersionsService} from './services/game-versions.service';
import {ComponentsModule} from './components/components.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ThemeService} from './services/theme.service';
import {BrowseModule} from './pages/browse/browse.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ComponentsModule,
    BrowserAnimationsModule,

    HomeModule,
    SearchModule,
    BrowseModule
  ],
  providers: [
    GameVersionsService,
    ThemeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
