import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, UsersService } from '@estore/users';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';

type Country = {
    id: string,
    country: string
}
@Component({
    selector: 'admin-users-form',
    templateUrl: './users-form.component.html',
    styles: []
})
export class UsersFormComponent implements OnInit {
    form!: FormGroup;
    editMode = false;
    currUserId? : string;
    isSubmitted = false;
    countries: Country[] = [];
    constructor(
        private usersService: UsersService,
        private formBuilder: FormBuilder,
        private messageService: MessageService,
        private location: Location,
        private route: ActivatedRoute,
    ) { }
    ngOnInit(): void {
        this._getCountries();
        this._initUserForm();
        this._checkEditMode();
    }
    private _initUserForm() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            isAdmin: [false],
            street: [''],
            apartment: [''],
            zip: [''],
            city: [''],
            country: [''],

        })
    }

    onSubmit() {
        this.isSubmitted = true;

        if (this.form.invalid) {
            return;
        }
        const user: User = {
            _id: this.currUserId,
            name: this.userForm['name'].value,
            password: this.userForm['password'].value,
            email: this.userForm['email'].value,
            phone: this.userForm['phone'].value,
            isAdmin: this.userForm['isAdmin'].value,
            street: this.userForm['street'].value,
            apartment: this.userForm['apartment'].value,
            zip: this.userForm['zip'].value,
            city: this.userForm['city'].value,
            country: this.userForm['country'].value,
        }

        if (this.editMode) {
            this._updateUser(user);
        } else {
            this._addUser(user);
        }
    }

    private _addUser(user: User) {
        this.usersService.createUser(user).subscribe(
            (user: User) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `User ${user.name} is created!`
                });
                timer(2000)
                    .toPromise()
                    .then(() => {
                        this.location.back();
                    });
            },
            () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'error',
                    detail: `User is not created!`
                })
            }
        )
    }
    private _updateUser(user: User) {
        this.usersService.updateUser(user).subscribe(
            () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'User is updated'
                });
                timer(2000).toPromise()
                    .then(() => this.location.back());
            },
            () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'User is not updated!'
                });
            }
        )
    }
    private _checkEditMode() {
        this.route.params.subscribe(params => {
            const pID = params['id'];
            if(pID) {
                this.editMode = true;
                this.currUserId = pID;
                this.usersService.getUser(pID).subscribe(u => {
                    this.userForm['name'].setValue(u.name);
                    this.userForm['email'].setValue(u.email);
                    this.userForm['isAdmin'].setValue(u.isAdmin);
                    this.userForm['street'].setValue(u.street);
                    this.userForm['phone'].setValue(u.phone);
                    this.userForm['apartment'].setValue(u.apartment);
                    this.userForm['city'].setValue(u.city);
                    this.userForm['country'].setValue(u.country);
                    this.userForm['zip'].setValue(u.zip);
                    this.userForm['password'].setValidators([]);
                    this.userForm['password'].updateValueAndValidity();
                })
            }
        })
    }
    private _getCountries(){
        this.countries = this.usersService.getCountries();
    }
    get userForm(){
        return this.form.controls;
    }
}

