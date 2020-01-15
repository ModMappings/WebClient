import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowsePageComponent} from './browse-page/browse-page.component';
import {ComponentsModule} from '../../components/components.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [BrowsePageComponent],
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: BrowsePageComponent
    }]),
    CommonModule,
    ComponentsModule
  ]
})
export class BrowseModule { }
