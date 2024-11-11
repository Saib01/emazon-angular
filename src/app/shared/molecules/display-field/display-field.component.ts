import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-display-field',
  templateUrl: './display-field.component.html',
  styleUrls: ['./display-field.component.scss']
})
export class DisplayFieldComponent{
  @Input() label:string='';
  @Input() value:string='';
}
