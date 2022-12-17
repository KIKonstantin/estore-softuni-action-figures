import { Component, OnInit } from '@angular/core';
import { Order, OrdersService, ORDER_STATUS } from '@estore/orders';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
    selector: 'admin-orders-detail',
    templateUrl: './orders-detail.component.html',
    styles: []
})
export class OrdersDetailComponent implements OnInit{
    order: Order;
    orderStatuses: any = [];
    selectedStatus: any;
    constructor(private orderService: OrdersService, private route: ActivatedRoute, private messageService: MessageService){}
    ngOnInit(): void {
        this._getOrder();
        this._mapOrderStatus();
    }

    private _mapOrderStatus() {
       this.orderStatuses = Object.keys(ORDER_STATUS).map((k, i) => {
            return {
                id: k,
                name: k
            }
        });
    }

    onStatusChange(event: any){
        this.orderService.updateStatus({status: event.value}, this.order.id).subscribe(() => {
            () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'success',
                    detail: 'Status is updated'
                })
            };
        }),
        () => {
            this.messageService.add({
                severity: 'error',
                summary: 'error',
                detail: 'Status is not updated'
            })
        }
    }

    private _getOrder(){
        setTimeout(() => {
            this.route.params.subscribe(p => {
                if(p['id']){
                    this.orderService.getOrder(p['id']).subscribe(o => {
                        this.order = o;
                        this.selectedStatus = o.status;
                    });
                }
            })
        }, 500)
    }
}
