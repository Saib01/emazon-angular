import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';
import { ErrorMessages } from '@models/error-messages.model';

@Component({
  selector: 'app-control-error',
  templateUrl: './control-error.component.html',
  styleUrls: ['./control-error.component.scss']
})
export class ControlErrorComponent implements OnInit{
  formControl!: FormControl;
  @Input() controlName: string='';
  @Input() errorMessages: ErrorMessages[]=[];
  constructor(private readonly rootFormGroup: FormGroupDirective) {}
  ngOnInit(): void {
  this.formControl = this.rootFormGroup.control.get(
    this.controlName
   ) as FormControl;
}
}


