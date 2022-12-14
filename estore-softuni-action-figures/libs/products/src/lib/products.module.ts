import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductComponent } from './components/featured-product/featured-product.component';
import { ButtonModule } from 'primeng/button';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import {CheckboxModule} from 'primeng/checkbox';
import {FormsModule} from '@angular/forms';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import {RatingModule} from 'primeng/rating';
import {InputNumberModule} from 'primeng/inputnumber';
const routes: Routes = [
  {
    path: 'products',
    component: ProductsListComponent
  },
  {
    path: 'products/:productid',
    component: ProductDetailComponent
  },
  {
    path: 'category/:categoryid',
    component: ProductsListComponent
  }

]

@NgModule({
    imports: [    
      CommonModule,
      RouterModule.forChild(routes),
      ButtonModule,
      CheckboxModule,
      FormsModule,
      RatingModule,
      InputNumberModule
    ],
    declarations: [
      ProductSearchComponent,
      CategoriesBannerComponent,
      ProductItemComponent,
      FeaturedProductComponent,
      ProductsListComponent,
      ProductDetailComponent,
    ],
    exports:[ProductSearchComponent, CategoriesBannerComponent, ProductItemComponent, FeaturedProductComponent, ProductDetailComponent]
})
export class ProductsModule {}
