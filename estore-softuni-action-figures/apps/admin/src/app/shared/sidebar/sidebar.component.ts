import { Component, OnInit } from '@angular/core';
import { AuthService } from '@estore/users';
import { LocalStorageService } from 'libs/users/src/lib/services/local-storage.service';

@Component({
    selector: 'admin-sidebar',
    templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit{
    username: any = 'guest';
 constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService
 ) {}
 ngOnInit(): void {
     this.getUsername();
 }
 getUsername(){
    if( this.username === 'guest'){
        this.username = this.localStorageService.getUserName();
        this.username = this.username.split('@')[0] + '@';
        console.log('hey')
    }
 }
 logoutUser() {
    this.authService.logout();
    }
}
