import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorMessages } from '@models/error-messages.model';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent{
  @Input() formGroup!: FormGroup;
  @Input() formName:string='';
  @Input() errorNameMessages: ErrorMessages[]=[];
  @Input() errorDescriptionMessages: ErrorMessages[]=[];
  @Output() validateEvent = new EventEmitter();
  constructor( private readonly router: Router) {}
  validate(){
    this.validateEvent.emit();
  }
}