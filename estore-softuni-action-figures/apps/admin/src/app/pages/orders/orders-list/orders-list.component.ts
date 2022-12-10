import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@estore/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IOS } from '../interfaces';
import { ORDER_STATUS } from '../order.constants';



@Component({
    selector: 'admin-orders-list',
    templateUrl: './orders-list.component.html',
    styles: []
})
export class OrdersListComponent implements OnInit {
    orders: Order[] = [];
    orderStatus: IOS = ORDER_STATUS;
    constructor(
        private ordersService: OrdersService,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
        ) { }
    ngOnInit(): void {
        this._getOrders();
    }

    _getOrders() {
        this.ordersService.getOrders().subscribe(o => {
            this.orders = o;
            console.log(o)
        })
    }
    deleteOrder(orderId: string){
        this.confirmationService.confirm({
            message: 'Do you want to delete this order?',
            header: 'Delete Order',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.ordersService.deleteOrder(orderId).subscribe(
                    () => {
                        this._getOrders();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'success',
                            detail: 'Order is deleted!'
                        });
                    },
                    () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Order is not deleted!'
                        })
                    }
                )
            }
        })
    }
    showOrder(orderId: string){
        this.router.navigateByUrl('orders/' + orderId);
    }
}
