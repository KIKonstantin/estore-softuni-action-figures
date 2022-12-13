import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductService } from '@estore/products'
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'admin-products-list',
    templateUrl: './products-list.component.html',
    styles: []
})
export class ProductsListComponent implements OnInit, OnDestroy {

    products: Product[] = [];
    endsubs$ : Subject<any> = new Subject();

    constructor (private productsService : ProductService, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) { } 
    ngOnInit(): void {
        this._getProducts();
    }
    private _getProducts() {
        this.productsService.getProducts().pipe(takeUntil(this.endsubs$)).subscribe(p => {
            console.log('this is p ',p)
            this.products = p;
        })
    }
    ngOnDestroy(): void {
        this.endsubs$.complete();
    }

    updateProduct(productId: string){
        this.router.navigateByUrl(`products/form/${productId}`);
    }
    deleteProduct(productId: string) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this Product?',
            header: 'Delete Product',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.productsService.deleteProduct(productId).pipe(takeUntil(this.endsubs$)).subscribe(
                    ()=> {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is successfuly deleted' });
                    },
                    ()=>{
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product is not successfuly deleted' })
                    });
                    this._getProducts();
            },
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            reject: () => {}
        });
    }
}
