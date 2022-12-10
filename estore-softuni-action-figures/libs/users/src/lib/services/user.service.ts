import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env";
import { Observable } from "rxjs";
import { User } from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class UsersService{
    apiUrlUsers = environment.apiUrlUsers

    constructor(private http: HttpClient){}

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
}