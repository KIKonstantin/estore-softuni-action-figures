import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ProductService } from '../../services/products.service';

@Component({
  selector: 'products-featured-product',
  templateUrl: './featured-product.component.html',
  styles: [
  ]
})
export class FeaturedProductComponent implements OnInit, OnDestroy{
  featuredProducts: Product[] = [];
  endSubs$: Subject<any> = new Subject();
  constructor (
    private prodService : ProductService
  ) { }

  ngOnInit(): void {
      this._getFeaturedProducts()
    }
    ngOnDestroy(): void {
      this.endSubs$.complete();
    }
    
    private _getFeaturedProducts() { 
      this.prodService.getFeaturedProducts(4).pipe(takeUntil(this.endSubs$)).subscribe(p => {
        this.featuredProducts = p;
      })
  }
}
