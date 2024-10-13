import {Component, Input } from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';
import { ErrorMessages } from '../../../models/error-messages.model';

@Component({
  selector: 'text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent {
  formControl!: FormControl;
  @Input() controlName!: string;
  @Input() placeHolder!:string;
  @Input() errorMessages!: ErrorMessages[];
  constructor(private readonly rootFormGroup: FormGroupDirective) {}
  ngOnInit(): void {
    this.formControl = this.rootFormGroup.control.get(this.controlName) as FormControl;
  }
}
