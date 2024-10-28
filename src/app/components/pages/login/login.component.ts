import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorMessages } from '@models/error-messages.model';
import { UserLogin } from '@models/user.model';
import { AuthService } from '@services/auth.service.service';

import {
  USER_EMAIL_EMPTY_OR_NULL_ERROR,
  USER_PASSWORD_EMPTY_OR_NULL_ERROR,
} from '@shared/constants/user-register.constants';
import { CustomValidators } from '@utils/custom-validators';
import { CustomValidatorsAsync } from '@utils/custom-validators-async';

const {
  checkNoWhitespace,
  WHITESPACE_ERROR,
} = CustomValidators;
const {
  checkUserAvailability,
} = CustomValidatorsAsync;
const { pattern } = Validators;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {
  formWarehouse = this.formBuilder.nonNullable.group(
    {
      email: [ '', [checkNoWhitespace()] ],
      password: ['', [checkNoWhitespace()]]
    }
  );
  errorMessages: { [key: string]: ErrorMessages[] } = {
    email: [{ type: WHITESPACE_ERROR, message: USER_EMAIL_EMPTY_OR_NULL_ERROR}],
    password: [{type: WHITESPACE_ERROR, message: USER_PASSWORD_EMPTY_OR_NULL_ERROR}]
  };

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  validateWarehouse() {
    if (this.formWarehouse.valid) {
      const userLogin: UserLogin = {
        username: this.formWarehouse.getRawValue().email,
        password: this.formWarehouse.getRawValue().password,
      };
      console.log(userLogin);
      this.authService.login(userLogin).subscribe({
        next: (rta) => {
          //this.router.navigate(['/panel/home']);
          console.log(rta);
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
