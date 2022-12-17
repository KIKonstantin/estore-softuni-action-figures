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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutPageComponent } from './lib/pages/checkout-page/checkout-page.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { ThankYouPageComponent } from './lib/pages/thank-you-page/thank-you-page.component';
const routes: Routes = [
  {
    path: 'cart',
    component: CartPageComponent
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent
  },
  {
    path: 'success',
    component: ThankYouPageComponent
  }
]

@NgModule({
    imports: [CommonModule, BadgeModule, RouterModule.forChild(routes), ButtonModule, InputNumberModule, FormsModule, InputTextModule,
      InputMaskModule,
      DropdownModule,
      ReactiveFormsModule,
    ],
    declarations: [
      CartBadgeComponent,
      CartPageComponent,
      OrderSummaryComponent,
      CheckoutPageComponent,
      ThankYouPageComponent
    ],
    exports: [
      CartBadgeComponent,
      CartPageComponent,
      OrderSummaryComponent,
    ]
})
export class OrdersModule {
    constructor(
        cartService: CartService
    ){
        cartService.initCartLocalStorage();
    }
}
