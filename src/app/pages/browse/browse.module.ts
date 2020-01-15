import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowsePageComponent} from './browse-page/browse-page.component';
import {ComponentsModule} from '../../components/components.module';


@NgModule({
  declarations: [BrowsePageComponent],
  imports: [
    CommonModule,
    ComponentsModule
  ]
})
export class BrowseModule { }
