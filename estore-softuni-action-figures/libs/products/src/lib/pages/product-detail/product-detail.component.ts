import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem, CartService } from '@estore/orders';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ProductService } from '../../services/products.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'products-product-detail',
  templateUrl: './product-detail.component.html',
  styles: [
  ]
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  product?: Product;
  endSubs$: Subject<any> = new Subject();
  quantity = 1;
  constructor(
    private productsService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private messageService: MessageService
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['productid']){
        this._getProduct(params['productid']);
      }
    })
  };
  ngOnDestroy(): void {
      this.endSubs$.complete();
  }

  private _getProduct(id: string){
    this.productsService.getProduct(id).pipe(takeUntil(this.endSubs$)).subscribe(p => {
      this.product = p;
    })
  }
  addProductToCart(){
    const cartItem : CartItem = {
      productId : this.product._id,
      quantity : this.quantity
    }

    this.cartService.setCartItem(cartItem);
    this.messageService.add({
      severity: 'success',
      summary: 'success',
      detail: 'Cart updated!'
    })  
  }
}
