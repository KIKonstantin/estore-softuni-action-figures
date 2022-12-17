import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../models/cart';
import { BehaviorSubject } from 'rxjs';
export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

  // constructor() { }
  initCartLocalStorage(){ 
    const cart : Cart = this.getCart();
    if(!cart){
      const initialCart = {
        items: [],
      };
      localStorage.setItem(CART_KEY, JSON.stringify(initialCart));
    }
  }
  emptyCart(){
    const initialCart = {
      items: []
    };
    localStorage.setItem(CART_KEY, JSON.stringify(initialCart))
    this.cart$.next(initialCart);
  }

  getCart(): Cart {
    const cartJsonString: any = localStorage.getItem(CART_KEY);
    const cart: Cart = JSON.parse(cartJsonString);
    return cart;
  }

  setCartItem(cartItem: CartItem, updateCartItem?:boolean): Cart {
      const cart = this.getCart();
      const cartItemExist = cart.items?.find((item) => item.productId === cartItem.productId);
      if(cartItemExist){
          cart.items?.map(item => {
            if(item.productId === cartItem.productId){
              if(updateCartItem){
                if(cartItem.quantity !==undefined && item.quantity !==undefined){
                  item.quantity = cartItem.quantity;
                  return item;
              }
              }else{
                if(cartItem.quantity !==undefined && item.quantity !==undefined){
                  item.quantity += cartItem.quantity;
                  return item;
              }
              }
            }
          })
      }  else{
        cart.items?.push(cartItem);
      }
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      this.cart$.next(cart);
      return cart;
  }
  deleteCartItem(productId: string){
    const cart = this.getCart();
    const newCart = cart.items?.filter(i => i.productId !== productId);
    cart.items = newCart;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    this.cart$.next(cart);
  }

}