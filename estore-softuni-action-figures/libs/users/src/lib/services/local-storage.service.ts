import { Injectable } from '@angular/core';
const TOKEN = 'jwtToken';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  setToken(data: any) {
    localStorage.setItem(TOKEN, data);
  }
  setUserName(username: string){
    localStorage.setItem('username', username)
  }
  getUserName(){
    return localStorage.getItem('username');
  }
  getToken(): string| null {
    return localStorage.getItem(TOKEN);
  }
  removeToken(){
    localStorage.removeItem(TOKEN);
  }
}
