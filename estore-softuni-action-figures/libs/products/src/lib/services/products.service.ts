import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Product } from '../models/product';
import { environment } from '@env';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrlProduct}`)
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${environment.apiUrlProduct}${productId}`)
  }

  getFeaturedProducts(count: number): Observable<Product[]>{
    return this.http.get<Product[]>(`${environment.apiUrlProduct}/get/featured/${count}`)
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(`${environment.apiUrlProduct}`, productData);
  }
  updateProduct(product: FormData, productId: string): Observable<Product> {
    return this.http.put<Product>(`${environment.apiUrlProduct}` + productId, product);
  }
  deleteProduct(productId: string): Observable<string> {
    return this.http.delete<string>(`${environment.apiUrlProduct}${productId}`);
  }
  getProductsCount(): Observable<{productCount: number }>{
    return this .http
    .get<{productCount: number }>(`${environment.apiUrlProduct}get/count`)
    .pipe();
  }
}


