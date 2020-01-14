import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageComponent } from './search-page/search-page.component';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
  declarations: [SearchPageComponent],
    imports: [
        CommonModule,
        ComponentsModule
    ]
})
export class SearchModule { }
