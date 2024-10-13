import { Component, Input } from '@angular/core';

@Component({
  selector: 'logo-emazon',
  templateUrl: './logo-emazon.component.html'
})
export class LogoEmazonComponent {
  @Input() svgFill: string = 'black';
  @Input() svgClass: string[] = [];
}
