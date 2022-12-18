import { Component, OnInit } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'estore-users-icon',
  templateUrl: './users-icon.component.html',
  styles: [
  ]
})
export class UsersIconComponent implements OnInit {
  // display = document.getElementById('dropdown-content').style.display;
 
  ngOnInit(): void {
  return;//     this.display = 'none'
  }
  showNav(){
  //   if(this.display == 'none'){
  //     this.display = 'block'
  //   }else{
  //     this.display = 'none'
  //   }
  }
}
