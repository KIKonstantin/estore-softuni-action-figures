import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ProductService } from '../../services/products.service';

@Component({
  selector: 'products-product-detail',
  templateUrl: './product-detail.component.html',
  styles: [
  ]
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  product?: Product;
  endSubs$: Subject<any> = new Subject();
  quantity: number;
  constructor(
    private productsService: ProductService,
    private route: ActivatedRoute
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
    return;
  }
}
