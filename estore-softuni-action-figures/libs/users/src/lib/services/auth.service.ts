import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  apiURLAuth = environment.apiUrlUsers;
  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string) : Observable<User>{
    return this.http.post<User>(`${this.apiURLAuth}login`, {
      email,
      password
    })
  }
}
