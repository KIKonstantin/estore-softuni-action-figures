import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '@estore/orders';
import { ProductService } from '@estore/products';
import { UsersService } from '@estore/users';
import { combineLatest } from 'rxjs';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'admin-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: []
})
export class DashboardComponent implements OnInit, OnDestroy {
    statistics: any = [];
    ordersCount: any;
    totalSales: any;
    productsCount: any;
    userCount: any;
    endsubs$ : Subject<any> = new Subject();

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
    ngOnDestroy(): void {
        this.endsubs$.complete();
    }
    _getStatistics() {
        this.orderService.getOrdersCount().pipe(takeUntil(this.endsubs$)).subscribe(o => {
            this.ordersCount = o.orderCount;
        });
        this.orderService.getTotalSales().pipe(takeUntil(this.endsubs$)).subscribe(o => {
            this.totalSales = o.totalSales;
        });
        this.productService.getProductsCount().pipe(takeUntil(this.endsubs$)).subscribe(o => {
            this.productsCount = o.productCount;
        });
        this.usersService.getUsersCount().pipe(takeUntil(this.endsubs$)).subscribe(o => {
            this.userCount = o.userCount;
        });

    }

}

