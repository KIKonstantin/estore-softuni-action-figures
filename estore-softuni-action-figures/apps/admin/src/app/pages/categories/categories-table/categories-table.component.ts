import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, CategoriesService } from '@estore/products';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'estore-categories-table',
    templateUrl: './categories-table.component.html',
    styles: []
})

export class CategoriesTableComponent implements OnInit {

    categories: Category[] = [];

    constructor(
        private categoryService: CategoriesService, 
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
        ) {

    }
    ngOnInit(): void {
        this._getCategories();
    }
    deleteCategory(categoryId: string) {
            this.confirmationService.confirm({
                message: 'Are you sure you want to delete this category?',
                header: 'Delete Category',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.categoryService.deleteCategory(categoryId).subscribe(
                        ()=> {
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category is successfuly deleted' });
                        },
                        ()=>{
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category is not successfuly deleted' })
                        });
                        this._getCategories();
                },
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                reject: () => {}
            });
        }

        updateCategory(categoryId: string) {
            this.router.navigateByUrl(`categories/form/${categoryId}`);
        }

 private _getCategories(){
    this.categoryService.getCategories().subscribe(c => {
        this.categories = c;
    })
 }   
}

