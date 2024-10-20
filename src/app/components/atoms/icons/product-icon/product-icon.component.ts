import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-icon',
  templateUrl: './product-icon.component.html'
})
export class ProductIconComponent {
  @Input() svgFill: string = 'currentColor';
  @Input() svgClass: string[] = [];
}
