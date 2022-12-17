import { Component, OnInit } from '@angular/core';
import { UsersService } from '@estore/users';

@Component({
  selector: 'estore-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private usersService: UsersService
  ){

  }
  ngOnInit(): void {
      this.usersService.initAppSession();
  }

  title = 'SU Prime Figures';
}
