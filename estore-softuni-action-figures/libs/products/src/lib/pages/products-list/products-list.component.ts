import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductService } from '../../services/products.service';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styles: []
})
export class ProductsListComponent implements OnInit {
  products?: Product[] = [];
  categories?: Category[] = [];
  isCategoryPage?: boolean;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private categoryService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      params['categoryid'] ? this._getProducts([params['categoryid']]) : this._getProducts();
      params['categoryid'] ? this.isCategoryPage = true : this.isCategoryPage = false;

    })
      this._getCategories();
  }
  private _getCategories(){
    this.categoryService.getCategories().subscribe(c => {
      this.categories = c;
    })
  }
  private _getProducts(categoriesFilter? : string[]){
    this.productService.getProducts(categoriesFilter).subscribe(p => {
      this.products = p;
    })
  }
  categoryFilter(){
    const selected: any = this.categories?.filter(category => category.checked).map(c=> c._id);
    this._getProducts(selected);
  }
}
