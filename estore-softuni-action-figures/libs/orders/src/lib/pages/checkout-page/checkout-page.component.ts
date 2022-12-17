import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UsersService } from '@estore/users';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Cart } from '../../models/cart';
import { Order } from '../../models/order';
import { OrderItems } from '../../models/order-items';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html'
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private ordersService: OrdersService
  ) {}
  checkoutFormGroup: FormGroup;
  isSubmitted = false;
  orderItems: OrderItems[] = [];
  userId: string;
  countries = [];
  unsubscribe$: Subject<any> = new Subject();

  ngOnInit(): void {
    this._initCheckoutForm();
    this._autoFillUserData();
    this._getCartItems();
    this._getCountries();
  }

  ngOnDestroy() {
    this.unsubscribe$.next;
    this.unsubscribe$.complete();
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  private _autoFillUserData() {
    this.usersService
      .observeCurrentUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((u) => {
        console.log(u.phone);
        if (u) {
          this.userId = u._id;
          this.checkoutForm['name'].setValue(u.name);
          this.checkoutForm['email'].setValue(u.email);
          this.checkoutForm['phone'].setValue(u.phone);
          this.checkoutForm['city'].setValue(u.city);
          this.checkoutForm['street'].setValue(u.street);
          this.checkoutForm['country'].setValue(u.country);
          this.checkoutForm['zip'].setValue(u.zip);
          this.checkoutForm['apartment'].setValue(u.apartment);
        }
      });
  }

  private _getCartItems() {
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity
      };
    });
  }

  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm['street'].value,
      shippingAddress2: this.checkoutForm['apartment'].value,
      city: this.checkoutForm['city'].value,
      zip: this.checkoutForm['zip'].value,
      country: this.checkoutForm['country'].value,
      phone: this.checkoutForm['phone'].value,
      status: 'pending',
      user: this.userId,
      dateOrdered: `${Date.now()}`
    };

    this.ordersService.createOrder(order).subscribe(
      () => {
        //redirect to thank you page // payment
        this.cartService.emptyCart();
        this.router.navigate(['/success']);
      },
      () => {
        //display some message to user
      }
    );
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }
}
