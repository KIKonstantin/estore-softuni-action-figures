import { Component, Input, OnInit } from '@angular/core';
import { CartItem, CartService } from '@estore/orders';
import { MessageService } from 'primeng/api';
import { Product } from '../../models/product';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styles: [
  ]
})
export class ProductItemComponent implements OnInit {
    @Input() product!: Product;

  constructor(
    private cartService: CartService,
    private messageService: MessageService
  ){ }

  ngOnInit(): void {
    return;
  }

  addProductToCart(){
    const cartItem: CartItem = {
      productId: this.product._id,
      quantity: 1
    }
    this.cartService.setCartItem(cartItem);
    this.messageService.add({
      severity: 'success',
      summary: 'success',
      detail: 'Cart updated!'
    })
  }
}
