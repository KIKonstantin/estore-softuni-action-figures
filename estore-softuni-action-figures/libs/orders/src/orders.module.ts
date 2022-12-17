import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './lib/services/cart.service';
import { CartBadgeComponent } from './lib/components/cart-badge/cart-badge.component';
import {BadgeModule} from 'primeng/badge';
import { CartPageComponent } from './lib/pages/cart-page/cart-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { OrderSummaryComponent } from './lib/order-summary/order-summary.component';
import { FormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: 'cart',
    component: CartPageComponent
  }
]

@NgModule({
    imports: [CommonModule, BadgeModule, RouterModule.forChild(routes), ButtonModule, InputNumberModule, FormsModule],
    declarations: [
      CartBadgeComponent,
      CartPageComponent,
      OrderSummaryComponent
    ],
    exports: [
      CartBadgeComponent,
      CartPageComponent,
      OrderSummaryComponent
    ]
})
export class OrdersModule {
    constructor(
        cartService: CartService
    ){
        cartService.initCartLocalStorage();
    }
}
