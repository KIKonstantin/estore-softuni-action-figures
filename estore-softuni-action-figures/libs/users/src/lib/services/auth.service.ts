import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  constructor(
    private http: HttpClient,
    private token: LocalStorageService,
    private router: Router
  ) { }

  register(
    name: string,
    email: string,
    password: string,
    phone: string, 
    city: string,
    isAdmin: boolean,
    apartment: string,
    country: string,
    zip: string,
    street: string
    ) : Observable<User>{
    return this.http.post<User>(`${environment.apiUrlUsers}register`, {
      name,
      email,
      password,
      phone,
      city,
      street,
      apartment,
      country,
      zip,
      isAdmin
    })
  }

  login(email: string, password: string) : Observable<User>{
    return this.http.post<User>(`${environment.apiUrlUsers}login`, {
      email,
      password
    })
  }

  logout(){
    this.token.removeToken();
    this.router.navigate(['/login']);
  }
}
