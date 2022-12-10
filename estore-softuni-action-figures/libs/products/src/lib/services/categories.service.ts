import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Category } from '../models/category';
import { environment } from '@env';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.apiUrlCategory)
  }

  getCategory(categoryId: string): Observable<Category> {
    return this.http.get<Category>(environment.apiUrlCategory + categoryId)
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(environment.apiUrlCategory, category);
  }
  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(environment.apiUrlCategory + category._id, category);
  }
  deleteCategory(categoryId: string): Observable<string> {
    return this.http.delete<string>(environment.apiUrlCategory + categoryId);
  }

}


