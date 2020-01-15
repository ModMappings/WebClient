import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchPageComponent} from './search-page/search-page.component';
import {ComponentsModule} from '../../components/components.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [SearchPageComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: SearchPageComponent
      }
    ]),
    CommonModule,
    ComponentsModule
  ]
})
export class SearchModule {
}
