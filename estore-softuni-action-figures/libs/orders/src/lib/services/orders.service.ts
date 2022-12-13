import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { environment } from '@env';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) {
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(environment.apiUrlOrders)
  }
  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(environment.apiUrlOrders + orderId)
  }
  deleteOrder(orderId: string): Observable<string> {
    return this.http.delete<string>(environment.apiUrlOrders + orderId);
  }
  updateStatus(status: { status: string }, orderId: string): Observable<Order> {
    return this.http.put<Order>(environment.apiUrlOrders + orderId, status)
  }
  getOrdersCount(): Observable< {orderCount: number } > {
    return this.http
      .get< {orderCount: number } >(`${environment.apiUrlOrders}get/count`);
  }
  getTotalSales(): Observable< {totalSales: number } > {
    return this.http
      .get<{totalSales: number }>(`${environment.apiUrlOrders}get/totalSales`)
      .pipe();
  }
}


