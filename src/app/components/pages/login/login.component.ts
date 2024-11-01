import { Component} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseLogin } from '@models/auth.model';
import { ErrorMessages } from '@models/error-messages.model';
import { UserLogin } from '@models/user.model';
import { AuthService } from '@services/auth.service';
import { TokenService } from '@services/token.service';

import {
  USER_EMAIL_EMPTY_OR_NULL_ERROR,
  USER_PASSWORD_EMPTY_OR_NULL_ERROR,
} from '@shared/constants/user-register.constants';
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
    private readonly authService: AuthService,
    private readonly tokenService:TokenService
  ) {}

  login() {

    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.loginForm.getRawValue();
    const userLogin: UserLogin = { username: email, password };


    this.authService.login(userLogin).subscribe({
      next: (response: ResponseLogin) => {
        const role = this.tokenService.getUserRole();
        let userRole:string='client';
        if(role?.includes('ADMIN')){
          userRole='admin';
        }else if(role?.includes('AUX_BODEGA')){
          userRole='warehouse';
        }
        this.router.navigate([userRole]);
      },
      error: (error)=>{
        console.log(error);
      }
    });
  }
}
