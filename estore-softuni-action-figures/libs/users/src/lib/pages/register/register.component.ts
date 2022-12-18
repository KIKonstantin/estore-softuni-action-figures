import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { UsersService } from '../../services/user.service';

@Component({
  selector: 'users-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  registerFormGroup!: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or password are wrong';
  countries = [];
  isAdmin: false;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private localStorageService: LocalStorageService,
    private usersService: UsersService,
    private router: Router
    ) { }
  ngOnInit(): void {
    this._initRegisterForm();
    this._getCountries();
  }
  private _initRegisterForm() {
    this.registerFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.registerFormGroup['invalid']) {
      console.log(this.registerFormGroup['invalid'])
      return;
    }

    const registerData = {
      name: this.registerForm['name'].value,
      email: this.registerForm['email'].value,
      password: this.registerForm['password'].value,
      phone: this.registerForm['phone'].value,
      city: this.registerForm['city'].value,
      street: this.registerForm['street'].value,
      apartment: this.registerForm['apartment'].value,
      country: this.registerForm['country'].value,
      zip: this.registerForm['zip'].value,
      isAdmin:this.isAdmin
    }

    this.auth.register(
      registerData.name,
      registerData.email, 
      registerData.password,
      registerData.phone,
      registerData.city,
      registerData.isAdmin,
      registerData.apartment,
      registerData.country,
      registerData.street,
      registerData.zip,
      ).subscribe(
      (user) => {
        this.authError = false;
        this.localStorageService.setUserName(registerData.email);
        this.localStorageService.setToken(user.token);
        this.router.navigate(['/']);
        setTimeout(() => window.location.reload(), 1000);
      },
      (error: HttpErrorResponse) => {
        this.authError = true;
        if (error.status !== 400) {
          this.authMessage = 'Error in ther Server. Please try again later.'
        }
      }
    )
  }
  get registerForm() {
    return this.registerFormGroup.controls;
  }
  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }
}
