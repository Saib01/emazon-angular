import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Status } from '@models/status.model';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent {
  @Input() tittle!: string ;
  @Input() fullSize:boolean=false;
  @Input() isActive:boolean=false;
  @Output() continueProcess = new EventEmitter();
  @Output() stopProcess = new EventEmitter();

}
