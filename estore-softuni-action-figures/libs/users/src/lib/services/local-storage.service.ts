import { Injectable } from '@angular/core';
const TOKEN = 'jwtToken';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  setToken(data: any) {
    localStorage.setItem(TOKEN, data);
  }
  geToken(): string| null {
    return localStorage.getItem(TOKEN);
  }
  removeToken(){
    localStorage.removeItem(TOKEN);
  }
}