import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ErrorMessages } from '@models/error-messages.model';
import { Status } from '@models/status.model';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent{
  @Input() status!:Status;
  @Input() formGroup!: FormGroup;
  @Input() formName:string='';
  @Input() errorNameMessages: ErrorMessages[]=[];
  @Input() errorDescriptionMessages: ErrorMessages[]=[];
  @Output() validateEvent = new EventEmitter();
  validate(){
    this.validateEvent.emit();
  }
}