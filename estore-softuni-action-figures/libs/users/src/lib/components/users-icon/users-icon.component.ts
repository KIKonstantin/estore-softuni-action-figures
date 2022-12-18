import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { UsersService } from '../../services/user.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'estore-users-icon',
  templateUrl: './users-icon.component.html',
  styles: [
  ]
})
export class UsersIconComponent implements OnInit {
  isLogged = this.localstorageService.checkuserSession();
  token: string;

  constructor(
    private localstorageService: LocalStorageService,
    private usersService: UsersService,
    private router: Router
  ) { }

ngOnInit(): void {
  this.isLogged = this.localstorageService.checkuserSession();
}
  logout() {
    this.localstorageService.removeToken();
    this.isLogged = this.localstorageService.checkuserSession();
  }


}
