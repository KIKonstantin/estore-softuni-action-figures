
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { ButtonModule } from 'primeng/button';
import {StyleClassModule} from 'primeng/styleclass';
import { RouterModule } from '@angular/router';
import { badGatewayComponent } from './pages/404/404.component';
@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    StyleClassModule,
    RouterModule
  ],
  declarations: [
    BannerComponent,
    badGatewayComponent,
  ],
  exports: [
    BannerComponent,
  ]
})
export class UiModule { }
