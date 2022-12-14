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
const routes: Routes = [
  {
    path: 'products',
    component: ProductsListComponent
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
      FormsModule
    ],
    declarations: [
      ProductSearchComponent,
      CategoriesBannerComponent,
      ProductItemComponent,
      FeaturedProductComponent,
      ProductsListComponent,
    ],
    exports:[ProductSearchComponent, CategoriesBannerComponent, ProductItemComponent, FeaturedProductComponent]
})
export class ProductsModule {}
