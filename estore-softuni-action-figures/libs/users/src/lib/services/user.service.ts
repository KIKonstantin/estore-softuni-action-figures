import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env";
import { Observable } from "rxjs";
import { User } from "../models/user";
import * as contriesList from 'i18n-iso-countries'
import { UsersFacade } from "../state/users.facade";
declare const require : any;

@Injectable({
    providedIn: 'root'
})
export class UsersService{
    apiUrlUsers = environment.apiUrlUsers

    constructor(
        private http: HttpClient,
        private userFacade: UsersFacade
        ){
        contriesList.registerLocale(require("i18n-iso-countries/langs/en.json"));
    }

    getUsers(): Observable<User[]>{
        return this.http.get<User[]>(this.apiUrlUsers);
    }
    getUser(userId : string): Observable<User>{
        return this.http.get<User>(this.apiUrlUsers + userId);
    }
    deleteUser(userId: string): Observable<User>{
        return this.http.delete<User>(this.apiUrlUsers + userId);
    }
    createUser(user: User): Observable<User> {
        return this.http.post<User>(`${environment.apiUrlUsers}`, user);
    }
    updateUser(user: User): Observable<User> {
        return this.http.put<User>(environment.apiUrlUsers + user._id, user);
    }
    getCountries(){
        return Object.entries(contriesList.getNames("en", {select: "official"})).map(e => {
            return {
             id: e[0],
             country: e[1]
            }
         }); 
    }
    getCountry(countryKey: string): string{
    return contriesList.getName(countryKey, 'en');
    }
    getUsersCount(): Observable<{userCount: number }> {
        return this.http.
        get<{userCount: number }>(`${environment.apiUrlUsers}get/count`)
        .pipe();
    }

    initAppSession() {
        this.userFacade.buildUserSession()
    }
    observeCurrentUser(){
        return this.userFacade.currentUser$;
    }
    isCurrentUserAuth(){
        return this.userFacade.isAuthenticated$;
    }
}