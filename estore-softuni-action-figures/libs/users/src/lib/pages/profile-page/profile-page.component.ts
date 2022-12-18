import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { LocalStorageService } from '../../services/local-storage.service';
import { UsersService } from '../../services/user.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'estore-profile-page',
  templateUrl: './profile-page.component.html',
  styles: [
  ]
})

// TODO: PROFILE PAGE
export class ProfilePageComponent implements OnInit {
  isLogged = false;
  user: User;
  constructor(
    private localStorageService: LocalStorageService,
    private userService: UsersService
  ){}
  ngOnInit(): void {
      this._checkUser();
  }



  private _checkUser(){
    if(this.localStorageService.checkuserSession()){
      return this.isLogged = true;
    }else{
      return this.isLogged = false;
    }
  }
}
