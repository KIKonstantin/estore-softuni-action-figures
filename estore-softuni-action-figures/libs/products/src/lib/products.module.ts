import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { RouterModule } from '@angular/router';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductComponent } from './components/featured-product/featured-product.component'
import { ButtonModule } from 'primeng/button'
@NgModule({
    imports: [CommonModule, RouterModule, ButtonModule],
    declarations: [
      ProductSearchComponent,
      CategoriesBannerComponent,
      ProductItemComponent,
      FeaturedProductComponent,
    ],
    exports:[ProductSearchComponent, CategoriesBannerComponent, ProductItemComponent, FeaturedProductComponent]
})
export class ProductsModule {}
