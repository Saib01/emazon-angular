import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorMessages } from '@models/error-messages.model';
import { UserRegister } from '@models/user.model';
import { AuthService } from '@services/auth.service';
import {
  PROPERTY_CONFIRM_PASSWORD,
  PROPERTY_EMAIL,
  PROPERTY_ID_DOCUMENT,
  PROPERTY_PASSWORD,
} from '@shared/constants/properties.constants';
import {
  USER_NAME_REGEX,
  USER_EMAIL_REGEX,
  USER_ID_DOCUMENT_REGEX,
  USER_MIN_AGE,
  USER_NAME_MAX_LENGTH,
  USER_PASSWORD_REGEX,
  USER_PHONE_NUMBER_REGEX,
  USER_NAME_REGEX_ERROR,
  USER_LAST_NAME_EMPTY_OR_NULL_ERROR,
  USER_NAME_EMPTY_OR_NULL_ERROR,
  USER_NAME_MAX_LENGTH_ERROR,
  USER_LAST_NAME_MAX_LENGTH_ERROR,
  USER_LAST_NAME_REGEX_ERROR,
  USER_ID_DOCUMENT_EMPTY_OR_NULL_ERROR,
  USER_ID_DOCUMENT_REGEX_ERROR,
  USER_ID_DOCUMENT_NOT_AVAILABLE_ERROR,
  USER_PHONE_NUMBER_EMPTY_OR_NULL_ERROR,
  USER_PHONE_NUMBER_REGEX_ERROR,
  USER_DATE_OF_BIRTH_REQUIRED_ERROR,
  USER_DATE_OF_BIRTH_AGE_ERROR,
  USER_EMAIL_EMPTY_OR_NULL_ERROR,
  USER_EMAIL_REGEX_ERROR,
  USER_EMAIL_NOT_AVAILABLE_ERROR,
  USER_PASSWORD_EMPTY_OR_NULL_ERROR,
  USER_PASSWORD_REGEX_ERROR,
  USER_CONFIRM_PASSWORD_EMPTY_OR_NULL_ERROR,
  USER_CONFIRM_PASSWORD_MATCH_ERROR,
} from '@shared/constants/user-register.constants';
import { CustomValidators } from '@utils/custom-validators';
import { CustomValidatorsAsync } from '@utils/custom-validators-async';

const {
  checkNoWhitespace,
  checkUserAge,
  MatchValidator,
  WHITESPACE_ERROR,
  MISMATCH_ERROR,
  UNDERAGE_ERROR,
} = CustomValidators;
const {
  checkUserAvailability,
  NOT_AVAILABLE_EMAIL_ERROR,
  NOT_AVAILABLE_ID_DOCUMENT_ERROR,
} = CustomValidatorsAsync;
const { pattern, maxLength, required } = Validators;
@Component({
  selector: 'app-create-warehouse-assistant',
  templateUrl: './create-warehouse-assistant.component.html',
  styleUrls: ['./create-warehouse-assistant.component.scss'],
})
export class CreateWarehouseAssistantComponent {
  formWarehouse = this.formBuilder.nonNullable.group(
    {
      name: [
        '',
        [
          checkNoWhitespace(),
          pattern(USER_NAME_REGEX),
          maxLength(USER_NAME_MAX_LENGTH),
        ],
      ],
      lastName: [
        '',
        [
          checkNoWhitespace(),
          pattern(USER_NAME_REGEX),
          maxLength(USER_NAME_MAX_LENGTH),
        ],
      ],
      idDocument: [
        null,
        [checkNoWhitespace(), pattern(USER_ID_DOCUMENT_REGEX)],
        checkUserAvailability(this.authService, PROPERTY_ID_DOCUMENT),
      ],
      phoneNumber: [
        null,
        [checkNoWhitespace(), pattern(USER_PHONE_NUMBER_REGEX)],
      ],
      dateOfBirth: [null, [required, checkUserAge(USER_MIN_AGE)]],
      email: [
        '',
        [checkNoWhitespace(), pattern(USER_EMAIL_REGEX)],
        checkUserAvailability(this.authService, PROPERTY_EMAIL),
      ],
      password: ['', [checkNoWhitespace(), pattern(USER_PASSWORD_REGEX)]],
      confirmPassword: ['', [required]],
    },
    {
      validators: [
        MatchValidator(PROPERTY_PASSWORD, PROPERTY_CONFIRM_PASSWORD),
      ],
    }
  );
  errorMessages: { [key: string]: ErrorMessages[] } = {
    name: [
      { 
        type: WHITESPACE_ERROR, 
        message: USER_NAME_EMPTY_OR_NULL_ERROR 
      },
      {
        type: pattern.name,
        message: USER_NAME_REGEX_ERROR
      },
      {
        type: maxLength.name,
        message: USER_NAME_MAX_LENGTH_ERROR
      },
    ],
    lastName: [
      {
        type: WHITESPACE_ERROR,
        message: USER_LAST_NAME_EMPTY_OR_NULL_ERROR
      },
      {
        type: pattern.name,
        message: USER_LAST_NAME_REGEX_ERROR
      },
      {
        type: maxLength.name,
        message: USER_LAST_NAME_MAX_LENGTH_ERROR
      },
    ],
    idDocument: [
      {
        type: WHITESPACE_ERROR,
        message: USER_ID_DOCUMENT_EMPTY_OR_NULL_ERROR
      },
      {
        type: pattern.name,
        message: USER_ID_DOCUMENT_REGEX_ERROR,
      },
      {
        type: NOT_AVAILABLE_ID_DOCUMENT_ERROR,
        message: USER_ID_DOCUMENT_NOT_AVAILABLE_ERROR
      },
    ],
    phoneNumber: [
      {
        type: WHITESPACE_ERROR,
        message: USER_PHONE_NUMBER_EMPTY_OR_NULL_ERROR
      },
      {
        type: pattern.name,
        message:USER_PHONE_NUMBER_REGEX_ERROR
      },
    ],
    dateOfBirth: [
      { 
        type: required.name,
        message: USER_DATE_OF_BIRTH_REQUIRED_ERROR
      },
      {
        type: UNDERAGE_ERROR,
        message: USER_DATE_OF_BIRTH_AGE_ERROR
      },
    ],
    email: [
      { 
        type: WHITESPACE_ERROR, 
        message: USER_EMAIL_EMPTY_OR_NULL_ERROR
      },
      {
        type: pattern.name,
        message: USER_EMAIL_REGEX_ERROR,
      },
      {
        type: NOT_AVAILABLE_EMAIL_ERROR,
        message: USER_EMAIL_NOT_AVAILABLE_ERROR,
      },
    ],
    password: [
      {
        type: WHITESPACE_ERROR,
        message: USER_PASSWORD_EMPTY_OR_NULL_ERROR,
      },
      {
        type: pattern.name,
        message: USER_PASSWORD_REGEX_ERROR,
      },
    ],
    confirmPassword: [
      {
        type: required.name,
        message: USER_CONFIRM_PASSWORD_EMPTY_OR_NULL_ERROR,
      },
      { 
        type: MISMATCH_ERROR, 
        message: USER_CONFIRM_PASSWORD_MATCH_ERROR
      }
    ],
  };

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  validateWarehouse() {
    if (this.formWarehouse.valid) {
      const warehouse: UserRegister = {
        name: this.formWarehouse.getRawValue().name,
        lastName: this.formWarehouse.getRawValue().lastName,
        idDocument: String(this.formWarehouse.getRawValue().idDocument),
        phoneNumber: String(this.formWarehouse.getRawValue().phoneNumber),
        dateOfBirth: String(this.formWarehouse.getRawValue().dateOfBirth),
        email: this.formWarehouse.getRawValue().email,
        password: this.formWarehouse.getRawValue().password,
      };
      this.authService.createWarehouse(warehouse).subscribe({
        next: (rta) => {
          this.router.navigate(['/panel/home']);
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.formWarehouse.markAllAsTouched();
    }
  }
}
