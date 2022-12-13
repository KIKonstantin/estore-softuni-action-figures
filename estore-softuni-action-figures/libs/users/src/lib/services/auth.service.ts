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
  apiURLAuth = environment.apiUrlUsers;
  constructor(
    private http: HttpClient,
    private token: LocalStorageService,
    private router: Router
  ) { }

  login(email: string, password: string) : Observable<User>{
    return this.http.post<User>(`${this.apiURLAuth}login`, {
      email,
      password
    })
  }
  logout(){
    this.token.removeToken();
    this.router.navigate(['/login']);
  }
}
