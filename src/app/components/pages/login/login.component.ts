import { HttpStatusCode } from '@angular/common/http';
import { Component} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorMessages } from '@models/error-messages.model';
import { Status } from '@models/status.model';
import { UserLogin } from '@models/user.model';
import { AuthService } from '@services/auth.service';

import {
  LOGIN_ERROR,
  LOGIN_TITTLE_ERROR,
  USER_EMAIL_EMPTY_OR_NULL_ERROR,
  USER_PASSWORD_EMPTY_OR_NULL_ERROR,
} from '@shared/constants/user.constants';
import { CustomValidators } from '@utils/custom-validators';

const {
  checkNoWhitespace,
  WHITESPACE_ERROR,
} = CustomValidators;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

  status: Status = {
    code: null,
    messages:new Map([[HttpStatusCode.Unauthorized, LOGIN_ERROR]]),
    tittles: new Map([[false, LOGIN_TITTLE_ERROR]])
  } 
  loginForm = this.formBuilder.nonNullable.group(
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
  login() {

    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.loginForm.getRawValue();
    const userLogin: UserLogin = { username: email, password: password };
    this.authService.login(userLogin).subscribe({
      next: () => {
        this.router.navigate(['/panel/home']);
      },
      error: (error) => {
        this.status.code=error.status;
      }
    });
  }
}
