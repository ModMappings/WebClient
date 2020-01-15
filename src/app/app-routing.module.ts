import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './pages/home/home-page/home-page.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomePageComponent},
  {path: 'search', loadChildren: () => import('./pages/search/search.module').then(m => m.SearchModule)},
  {path: 'browse', loadChildren: () => import('./pages/browse/browse.module').then(m => m.BrowseModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
