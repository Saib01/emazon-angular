import {  Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls:['./button.component.scss']
})
export class ButtonComponent{ 
  @Input() typeBtn: 'reset' | 'submit' | 'button' = 'button';
  @Input() isDisabled:boolean=true;
  @Input() isBackgroundBlack:boolean=true;
}
