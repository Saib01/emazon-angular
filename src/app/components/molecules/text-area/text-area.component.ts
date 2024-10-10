
import {Component, Input } from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';
import { ErrorMessages } from '../../../models/error-messages.model';

@Component({
  selector: 'text-area',
  template: `
    <div class="field">
      <label class="field__name" for="description">Description:</label>
      <textarea
        [formControl]="formControl"
        class="field__text-area"
        [ngClass]="{ 'field__text-area--error': formControl.touched && formControl.invalid }"
        type="text"
        rows="5"
        cols="15"
        [placeholder]="placeHolder"
      ></textarea>
      <div class="field__error" *ngIf="formControl.touched && formControl.invalid">
        <div class="error" *ngFor="let error of errorMessages">
          <p class="error__name"
            *ngIf="formControl.hasError(error.type)"
          >
            {{ error.message }}
          </p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent {
  formControl!: FormControl;
  @Input() controlName!: string;
  @Input() placeHolder!:string;
  @Input() errorMessages!: ErrorMessages[];
  constructor(private readonly rootFormGroup: FormGroupDirective) {}
  ngOnInit(): void {
    this.formControl = this.rootFormGroup.control.get(
      this.controlName
    ) as FormControl;
  }
}
