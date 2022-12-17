import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { CartService } from '../services/cart.service';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'orders-summary',
  templateUrl: './order-summary.component.html',
  styles: [
  ]
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  totalPrice: number;
  endSubs$: Subject<any> = new Subject();
  cartItemsDetailed: any;
  cartCount = 0;
  isCheckOut = false;

  constructor(
    private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService,
  ) { 
    this.router.url.includes('checkout') ? this.isCheckOut = true : this.isCheckOut = false;
  }
  ngOnInit(): void {
    this._getOrderSummary();
  }
  ngOnDestroy(): void {
    this.endSubs$.next;
    this.endSubs$.complete();
  }
  _getOrderSummary() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe(cart => {
      this.totalPrice = 0;
      if (cart) {
        cart.items?.map(item => {
          this.ordersService
            .getProduct(item.productId)
            .pipe(take(1))
            .subscribe(p => {
              if (item.quantity) {
                this.totalPrice += p.price * item.quantity
              }
            })
        })
      }
      this.cartItemsDetailed = [];
      this.cartCount = cart?.items?.length ?? 0;
    })
  }

}
