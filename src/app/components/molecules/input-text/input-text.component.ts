import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';
import { ErrorMessages } from '../../../models/error-messages.model';

@Component({
  selector: 'input-text',
  template: `
    <div class="field">
      <label class="field__name" [for]="controlName"
        >{{ controlName | titlecase }}:</label
      >
      <input
        [formControl]="formControl"
        class="field__input"
        [ngClass]="{ 'field__input--error': formControl.touched && formControl.invalid }"
        type="text"
        [placeholder]="placeHolder"
      />
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
  styleUrls: ['./input-text.component.scss'],
})
export class InputTextComponent implements OnInit {
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
