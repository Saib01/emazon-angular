import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'side-bar-item',
  template: `
  <div class="item" [ngClass]="{ 'item--hidden': isClose }" routerLinkActive="item--active">
  <a class=item__link [ngClass]="{ 'item__link--hidden': isClose }" [routerLink]="link"
    routerLinkActive="item__link--active"
    >
      <ng-content></ng-content>
      <div class="item__text" [ngClass]="{ 'item__text--hidden': isClose }">
        <span >{{linkName|titlecase}}</span>
      </div>
    </a>
  </div>
  `,
  styleUrls: ['./side-bar-item.component.scss']
  
})
export class SideBarItemComponent {
  @Input() linkName:string='';
  @Input() link:string='';
  @Input() isClose:boolean=false;
  @Input() iconColor: string = 'black';
  constructor(
    private readonly route: ActivatedRoute
  ) { }
}
