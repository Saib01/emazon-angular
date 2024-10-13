import { Component, Input } from "@angular/core";


@Component({
  selector: 'menu-arrow',
  templateUrl: './menu-arrow.component.html'
})
export class MenuArrowComponent {
  @Input() svgFill: string = 'black';
  @Input() svgClass: string[] = [];
}


