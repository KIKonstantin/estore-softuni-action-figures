import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '@estore/orders';
import { ProductService } from '@estore/products';
import { UsersService } from '@estore/users';
import { combineLatest } from 'rxjs';

@Component({
    selector: 'admin-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: []
})
export class DashboardComponent implements OnInit {
    statistics: any = [];
    ordersCount: any;
    totalSales: any;
    productsCount: any;
    userCount: any;
    constructor(
        private usersService: UsersService,
        private productService: ProductService,
        private orderService: OrdersService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.router.navigate(['/dashboard']);
        this._getStatistics();
    }
    _getStatistics() {
        this.orderService.getOrdersCount().subscribe(o => {
            this.ordersCount = o.orderCount;
        });
        this.orderService.getTotalSales().subscribe(o => {
            this.totalSales = o.totalSales;
        });
        this.productService.getProductsCount().subscribe(o => {
            this.productsCount = o.productCount;
        });
        this.usersService.getUsersCount().subscribe(o => {
            this.userCount = o.userCount;
        });

    }

}

