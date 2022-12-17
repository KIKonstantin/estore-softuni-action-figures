import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemDetailed } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { Subject, takeUntil } from 'rxjs'
@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit, OnDestroy {
  cartItemsDetailed?: CartItemDetailed[] = [];
  cartCount = 0;
  endSubs$: Subject<any> = new Subject();
  constructor(
    private router: Router,
    private cartService: CartService,
    private orderService: OrdersService
  ) { }
  ngOnInit(): void {
    this._getCartDetails();
  }
  ngOnDestroy(): void {
    this.endSubs$.next;
    this.endSubs$.complete();
  }

  _getCartDetails() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe(responseCart => {
      this.cartItemsDetailed = [];
      this.cartCount = responseCart?.items?.length ?? 0;
      responseCart.items?.forEach(cartItem => {
        if (cartItem.productId !== undefined) {
          this.orderService.getProduct(cartItem.productId).subscribe(p => {
            this.cartItemsDetailed?.push({ product: p, quantity: cartItem.quantity })
          })
        }
      })
    })
  }

  backToShop() {
    this.router.navigate(['/products'])
  }
  deleteCartItem(cartItem: CartItemDetailed) {
    this.cartService.deleteCartItem(cartItem.product.id);
  }

  UpdateItemQuantity(event, cartItem: CartItemDetailed) {
    this.cartService.setCartItem({
      productId: cartItem.product.id,
      quantity: event.value
    }, true)
  }
}
