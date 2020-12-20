import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowsePageComponent} from './browse-page/browse-page.component';
import {ComponentsModule} from '../../components/components.module';
import {RouterModule} from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';


@NgModule({
  declarations: [BrowsePageComponent],
    imports: [
        RouterModule.forChild([{
            path: '',
            pathMatch: 'full',
            component: BrowsePageComponent
        }]),
        CommonModule,
        ComponentsModule,
        MatGridListModule
    ]
})
export class BrowseModule { }
