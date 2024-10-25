import { Component, Input} from '@angular/core';

@Component({
  selector: 'warehouse-icon',
  templateUrl: './warehouse-icon.component.html'
})
export class WarehouseIconComponent{
  @Input() svgFill: string = 'currentColor';
  @Input() svgClass: string[] = [];

}
