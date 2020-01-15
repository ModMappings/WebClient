import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './pages/home/home-page/home-page.component';
import {SearchPageComponent} from './pages/search/search-page/search-page.component';
import {BrowsePageComponent} from './pages/browse/browse-page/browse-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'browse', component: BrowsePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
