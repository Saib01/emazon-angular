import { Component, Input } from '@angular/core';

@Component({
  selector: 'home-icon',
  templateUrl: './home-icon.component.html'
})
export class HomeIconComponent {
  @Input() svgFill: string = 'currentColor';
  @Input() svgClass: string[] = [];
}
