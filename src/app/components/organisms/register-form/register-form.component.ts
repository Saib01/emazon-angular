import { HttpStatusCode } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ErrorMessages } from '@models/error-messages.model';
import { Status } from '@models/status.model';
import { UserRegister } from '@models/user.model';
import { UserService } from '@services/user.service';
import { PROPERTY_ID_DOCUMENT, PROPERTY_EMAIL, PROPERTY_PASSWORD, PROPERTY_CONFIRM_PASSWORD } from '@shared/constants/properties.constants';
import { USER_NAME_REGEX, USER_NAME_MAX_LENGTH, USER_ID_DOCUMENT_REGEX, USER_PHONE_NUMBER_REGEX, USER_MIN_AGE, USER_EMAIL_REGEX, USER_PASSWORD_REGEX, USER_NAME_EMPTY_OR_NULL_ERROR, USER_NAME_REGEX_ERROR, USER_NAME_MAX_LENGTH_ERROR, USER_LAST_NAME_EMPTY_OR_NULL_ERROR, USER_LAST_NAME_REGEX_ERROR, USER_LAST_NAME_MAX_LENGTH_ERROR, USER_ID_DOCUMENT_EMPTY_OR_NULL_ERROR, USER_ID_DOCUMENT_REGEX_ERROR, USER_ID_DOCUMENT_NOT_AVAILABLE_ERROR, USER_PHONE_NUMBER_EMPTY_OR_NULL_ERROR, USER_PHONE_NUMBER_REGEX_ERROR, USER_DATE_OF_BIRTH_REQUIRED_ERROR, USER_DATE_OF_BIRTH_AGE_ERROR, USER_EMAIL_EMPTY_OR_NULL_ERROR, USER_EMAIL_REGEX_ERROR, USER_EMAIL_NOT_AVAILABLE_ERROR, USER_PASSWORD_EMPTY_OR_NULL_ERROR, USER_PASSWORD_REGEX_ERROR, USER_CONFIRM_PASSWORD_EMPTY_OR_NULL_ERROR, USER_CONFIRM_PASSWORD_MATCH_ERROR, USER_TITTLE_ERROR, USER_TITTLE_SUCCESSFULLY } from '@shared/constants/user.constants';
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
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnChanges{
  @Input() statusCode: number | null = null;
  status: Status = {
    code: this.statusCode,
    messages: new Map([[HttpStatusCode.Created, '']]),
    tittles: new Map([[true, USER_TITTLE_SUCCESSFULLY],[false, USER_TITTLE_ERROR]])
  } 
  @Input() userType:'client'|'warehouse'='client';
  @Input() fullSize:boolean=true;
  @Output() userInfo = new EventEmitter<UserRegister>();

  formUserRegister = this.formBuilder.nonNullable.group(
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
        '',
        [checkNoWhitespace(), pattern(USER_ID_DOCUMENT_REGEX)],
        checkUserAvailability(this.userService, PROPERTY_ID_DOCUMENT),
      ],
      phoneNumber: [
        '',
        [checkNoWhitespace(), pattern(USER_PHONE_NUMBER_REGEX)],
      ],
      dateOfBirth: ['', [required, checkUserAge(USER_MIN_AGE)]],
      email: [
        '',
        [checkNoWhitespace(), pattern(USER_EMAIL_REGEX)],
        checkUserAvailability(this.userService, PROPERTY_EMAIL),
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
    private readonly userService: UserService
  ) {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['statusCode']) {
      this.status.code = this.statusCode;
    }
  }
  validateFormRegister() {
    if (this.formUserRegister.valid) {
      const user: UserRegister = {
        name: this.formUserRegister.getRawValue().name,
        lastName: this.formUserRegister.getRawValue().lastName,
        idDocument: String(this.formUserRegister.getRawValue().idDocument),
        phoneNumber: String(this.formUserRegister.getRawValue().phoneNumber),
        dateOfBirth: String(this.formUserRegister.getRawValue().dateOfBirth),
        email: this.formUserRegister.getRawValue().email,
        password: this.formUserRegister.getRawValue().password,
      };

      this.userInfo.emit(user);

    } else {
      this.formUserRegister.markAllAsTouched();
    }
  }

}
