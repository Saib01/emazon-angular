import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { of, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  const mockUserLogin= { email: 'test', password: 'password' };

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: {
          login: jest.fn()
        } },
        { provide: Router, useValue: {
          navigate: jest.fn()
        } }
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
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
    jest.spyOn(authService, 'login').mockReturnValue(of(
      {
      id:'1',
      email:'mail@mail.com',
      role:'ADMIN'
  }));
    (router.navigate as jest.Mock).mockReturnValueOnce(Promise.resolve(true));
    component.loginForm.setValue(mockUserLogin);
    component.login();
  });

  test('should log an error if login fails', () => {
    const mockError = { status: 401 };
    (authService.login as jest.Mock).mockReturnValueOnce(throwError(() => mockError ));
    component.loginForm.setValue(mockUserLogin);
    component.login();
    expect(component.status.code).toBe(401);
  });
});
