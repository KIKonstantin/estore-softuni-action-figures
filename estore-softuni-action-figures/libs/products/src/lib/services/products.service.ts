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

  createProduct(productData: FormData): Observable<Product> {
    console.log(productData)
    return this.http.post<Product>(`${environment.apiUrlProduct}`, productData);
  }
  updateProduct(product: FormData, productId: string): Observable<Product> {
    return this.http.put<Product>(`${environment.apiUrlProduct}` + productId, product);
  }
  deleteProduct(productId: string): Observable<string> {
    return this.http.delete<string>(`${environment.apiUrlProduct}${productId}`);
  }

}


