
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { ButtonModule } from 'primeng/button';
import {StyleClassModule} from 'primeng/styleclass';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    StyleClassModule,
    RouterModule
  ],
  declarations: [
    BannerComponent,
  ],
  exports: [
    BannerComponent,
  ]
})
export class UiModule { }
