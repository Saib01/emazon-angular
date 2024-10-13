import { Component, Input } from '@angular/core';

@Component({
  selector: 'side-bar-item',
  templateUrl: './side-bar-item.component.html',
  styleUrls: ['./side-bar-item.component.scss']
  
})
export class SideBarItemComponent {
  @Input() linkName:string='';
  @Input() link:string='';
  @Input() isClose:boolean=false;
  @Input() iconColor: string = 'black';
}
