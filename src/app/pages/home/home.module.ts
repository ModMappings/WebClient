import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import {ComponentsModule} from '../../components/components.module';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [HomePageComponent],
    imports: [
        CommonModule,
        ComponentsModule,
        MatIconModule
    ]
})
export class HomeModule { }
