import { Component, Input} from '@angular/core';

@Component({
  selector: 'brand-icon',
  templateUrl: './brand-icon.component.html'
})
export class BrandIconComponent {
  @Input() svgFill: string = 'currentColor';
  @Input() svgClass: string[] = [];
}
