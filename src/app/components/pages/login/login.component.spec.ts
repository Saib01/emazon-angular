import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseLogin } from '@models/auth.model';
import { AuthService } from '@services/auth.service';
import { TokenService } from '@services/token.service';
import { of, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let tokenService: TokenService;
  let router: Router;

  beforeEach(async () => {
    const authServiceSpy = {
      login: jest.fn()
    };
    const tokenServiceSpy = {
      getUserRole: jest.fn()
    };
    const routerSpy = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: TokenService, useValue: tokenServiceSpy },
        { provide: Router, useValue: routerSpy }
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    tokenService = TestBed.inject(TokenService);
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should mark all controls as touched if form is invalid on login attempt', () => {
    const markAllAsTouchedSpy = jest.spyOn(component.loginForm, 'markAllAsTouched');
    component.login();
    expect(markAllAsTouchedSpy).toHaveBeenCalled();
  });

  it('should call authService.login with correct user credentials if form is valid', () => {
    const loginSpy = jest.spyOn(authService, 'login').mockReturnValue(of({} as ResponseLogin));
    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
    component.login();
    expect(loginSpy).toHaveBeenCalledWith({ username: 'test@example.com', password: 'password123' });
  });

  it('should navigate to user role path on successful login', () => {
    const response: ResponseLogin = { token: 'fakeToken' };
    const loginSpy = jest.spyOn(authService, 'login').mockReturnValue(of(response));
    jest.spyOn(tokenService, 'getUserRole').mockReturnValue('ADMIN');

    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
    component.login();

    expect(loginSpy).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['admin']);
  });

  it('should navigate to "warehouse" if role contains AUX_BODEGA', () => {
    const response: ResponseLogin = { token: 'fakeToken' };
    jest.spyOn(authService, 'login').mockReturnValue(of(response));
    jest.spyOn(tokenService, 'getUserRole').mockReturnValue('AUX_BODEGA');

    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
    component.login();

    expect(router.navigate).toHaveBeenCalledWith(['warehouse']);
  });

  it('should navigate to "client" if role does not contain ADMIN or AUX_BODEGA', () => {
    const response: ResponseLogin = { token: 'fakeToken' };
    jest.spyOn(authService, 'login').mockReturnValue(of(response));
    jest.spyOn(tokenService, 'getUserRole').mockReturnValue('CLIENT');

    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
    component.login();

    expect(router.navigate).toHaveBeenCalledWith(['client']);
  });

  it('should log an error if login fails', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    (authService.login as jest.Mock).mockReturnValueOnce(throwError(() => new Error('Login failed')));
    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
    component.login();
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.any(Error));
  });
});
