import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category, Product, ProductService } from '@estore/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';

@Component({
    selector: 'admin-products-form',
    templateUrl: './products-form.component.html',
    styles: [],
})
export class ProductsFormComponent implements OnInit {
    editMode = false;
    form!: FormGroup;
    isSubmitted = false;
    currProductId?: any;
    categories: Category[] = [];
    imageDisplay!: any;


    constructor(
        private productService: ProductService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private location: Location,
    ) { }

    ngOnInit(): void {
        this._initForm();
        this._checkEditMode();
        this._getCategories();
    }
    onSubmit() {
        this.isSubmitted = true;
        if (this.form.invalid) return;
        const productFormData = new FormData();
        Object.keys(this.productForm).map(k => {
        productFormData.append(k, this.productForm[k].value);
        });
        if(this.editMode){
            this._updateProduct(productFormData);
        }else{
            this._addProduct(productFormData);
        }
    }

    onImageUpload(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.form.patchValue({image: file});
            this.form.get('image')?.updateValueAndValidity();
            const fileReader = new FileReader();
            fileReader.onload = () => {
                this.imageDisplay = fileReader.result;
            }
            fileReader.readAsDataURL(file);
        }
    }

    private _initForm() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            brand: ['', Validators.required],
            price: ['', Validators.required],
            category: ['', Validators.required],
            countInStock: ['', Validators.required],
            description: ['', Validators.required],
            richDescription: [''],
            image: [''],
            isFeatured: [false],
        });
    }



    private _checkEditMode() {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.editMode = true;
                this.currProductId = params['id'];
                this.productService.getProduct(params['id']).subscribe(p => {
                    this.productForm['name'].setValue(p.name);
                    this.productForm['brand'].setValue(p.brand);
                    this.productForm['isFeatured'].setValue(p.isFeatured);
                    this.productForm['countInStock'].setValue(p.countInStock);
                    this.productForm['price'].setValue(p.price);
                    this.productForm['category'].setValue(p.category?._id);
                    this.productForm['description'].setValue(p.description);
                    this.productForm['richDescription'].setValue(p.richDescription);
                    this.imageDisplay = p.image;
                    this.productForm['image'].setValidators([]);
                    this.productForm['image'].updateValueAndValidity();
                })
            }
        })
    }
    private _getCategories() {
        this.categoriesService.getCategories().subscribe(c => {
            this.categories = c;
        })
    }
    private _addProduct(productData: FormData){
        this.productService.createProduct(productData).subscribe(
            (product: Product) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: `Product ${product.name} is successfuly added` });
                timer(1500).toPromise().then(() => {
                    this.location.back();
                })
            },
            (product: Product) => { this.messageService.add({ severity: 'error', summary: 'Error', detail: `Product ${product.name} is not successfuly added` }) })
    }

    private _updateProduct(product: FormData){
        this.productService.updateProduct(product, this.currProductId).subscribe(
            (category: Category) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: `Category ${category.name} is successfuly updated` });
                timer(2000).toPromise().then(() => {
                    this.location.back();
                })
            },
            (category: Category) => { this.messageService.add({ severity: 'error', summary: 'Error', detail: `Category ${category.name} is not successfuly updated` }) })
    }

    get productForm() {
        return this.form.controls;
    }

}
