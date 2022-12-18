import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'estore-contact-page',
  templateUrl: './contact-page.component.html',
  styles: [
  ]
})
export class ContactPageComponent {
  constructor(private router: Router){}
  backToShop() {
    this.router.navigate(['/'])
  }
}
