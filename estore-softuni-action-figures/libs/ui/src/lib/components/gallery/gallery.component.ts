import { Component, Input, OnInit } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  styles: [
  ]
})
export class GalleryComponent implements OnInit {
  selectedImage?: string = '';

  @Input() images?: string[];

  // constructor() { }
  ngOnInit(): void {
    return;
  }
}
