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
  isValidToken(){
    const token = this.getToken();
    if(token){
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      return !this._tokenExpired(tokenDecode.exp)
    }else{
      return false;
    }
  }

  getUserIdFromToken(){
    const token = this.getToken();
    if(token){
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if(tokenDecode){
        return tokenDecode.userId;
      }else{
        return null;
      }
    }else{
      return null;
    }
  }
  checkuserSession(): boolean {
    const token = this.getToken();
    if (token) {
      return true;
    }else{
      return false;
    }
  }

  private _tokenExpired(expiration:any): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
