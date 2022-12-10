import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { CategoriesService, Category } from '@estore/products';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'admin-categories-form',
    templateUrl: './categories-form.component.html',
    styles: []
})
export class CategoriesFormComponent implements OnInit {

    form!: FormGroup;
    isSubmitted = false;
    editMode = false;
    currCategoryId?: string;
    constructor(
        private formBuilder: FormBuilder,
        private categoriesService: CategoriesService,
        private location: Location,
        private messageService: MessageService,
        private route: ActivatedRoute
    ) { }


    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            icon: ['', Validators.required],
            color: ['#fff']
        });

        this._checkEditMode();
    }

    onSubmit() {
        this.isSubmitted = true;

        if (this.form.invalid) {
            return;
        }
        const category: Category = {
            _id: this.currCategoryId,
            name: this.categoryForm['name'].value,
            icon: this.categoryForm['icon'].value,
            color: this.categoryForm['color'].value
        }

        if (this.editMode) {
            this._updateCategory(category);
        } else {
            this._addCategory(category);
        }
    }
    private _checkEditMode() {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.editMode = true;
                this.currCategoryId = params['id'];
                this.categoriesService.getCategory(params['id']).subscribe(c => {
                    this.categoryForm['name'].setValue(c.name);
                    this.categoryForm['icon'].setValue(c.icon);
                    this.categoryForm['color'].setValue(c.color);
                })
            }
        })
    }

    private _updateCategory(category: Category) {
        this.categoriesService.updateCategory(category).subscribe(
            (category: Category) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: `Category ${category.name} is successfuly updated` });
                timer(2000).toPromise().then(() => {
                    this.location.back();
                })
            },
            (category: Category) => { this.messageService.add({ severity: 'error', summary: 'Error', detail: `Category ${category.name} is not successfuly updated` }) })
    }

    private _addCategory(category: Category) {
        this.categoriesService.createCategory(category).subscribe(
            (category: Category) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: `Category ${category.name} is successfuly added` });
                timer(2000).toPromise().then(() => {
                    this.location.back();
                })
            },
            (category: Category) => { this.messageService.add({ severity: 'error', summary: 'Error', detail: `Category ${category.name} is not successfuly added` }) })
    };

    get categoryForm() {
        return this.form.controls
    }
}
