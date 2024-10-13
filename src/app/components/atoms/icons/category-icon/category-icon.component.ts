import { Component, Input } from '@angular/core';

@Component({
  selector: 'category-icon',
  templateUrl: './category-icon.component.html',
})
export class CategoryIconComponent {
  @Input() svgFill: string = 'currentColor';
  @Input() svgClass: string[] = [];
}
