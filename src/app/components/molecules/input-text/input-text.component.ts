import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';
import { ErrorMessages } from '../../../models/error-messages.model';

@Component({
  selector: 'input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
})
export class InputTextComponent implements OnInit {
  formControl!: FormControl;
  @Input() controlName: string='';
  @Input() placeHolder:string='';
  @Input() errorMessages: ErrorMessages[]=[];
  constructor(private readonly rootFormGroup: FormGroupDirective) {}
  ngOnInit(): void {
    this.formControl = this.rootFormGroup.control.get(
      this.controlName
     ) as FormControl;
  }
}
