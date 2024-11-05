import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { RegisterFormComponent } from './register-form.component';
import { UserService } from '@services/user.service';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let userServiceMock: Partial<UserService>;

  beforeEach(async () => {
    userServiceMock = {
      checkEmail: jest.fn().mockReturnValue(of({notAvailableEmail:true})), 
      checkIdDocument: jest.fn().mockReturnValue(of({notAvailableIdDocument:true})), 
    };

    await TestBed.configureTestingModule({
      declarations: [RegisterFormComponent],
      imports: [ReactiveFormsModule,HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        { provide: UserService, useValue: userServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create the form with correct controls and validations', () => {
    const form = component.formUserRegister;

    expect(form.contains('name')).toBeTruthy();
    expect(form.contains('lastName')).toBeTruthy();
    expect(form.contains('idDocument')).toBeTruthy();
    expect(form.contains('phoneNumber')).toBeTruthy();
    expect(form.contains('dateOfBirth')).toBeTruthy();
    expect(form.contains('email')).toBeTruthy();
    expect(form.contains('password')).toBeTruthy();
    expect(form.contains('confirmPassword')).toBeTruthy();

    form.controls['name'].setValue('   '); 
    expect(form.controls['name'].valid).toBeFalsy();
    expect(form.controls['name'].errors?.['whitespace']).toBeTruthy();
  });
  
  test('should show an error when email is invalid', () => {
    const control = component.formUserRegister.controls['email'];
    control.setValue('wrongEmail');
    expect(control.errors?.['pattern']).toBeTruthy(); 
  });
  test('should show an error when email is empty or null', () => {
    const control = component.formUserRegister.controls['email'];
    expect(control.errors?.['whitespace']).toBeTruthy(); 
  });
  test('should show an error when phone number is empty or null', () => {
    const control = component.formUserRegister.controls['phoneNumber'];
    expect(control.errors?.['whitespace']).toBeTruthy(); 
  });
  test('should show an error when phone number is invalid', () => {
    const control = component.formUserRegister.controls['phoneNumber'];
    control.setValue('222222222222222222222222222222222222222222');
    expect(control.errors?.['pattern']).toBeTruthy(); 
  });
  test('should show an error when date of birth is empty or null', () => {
    const control = component.formUserRegister.controls['dateOfBirth'];
    expect(control.errors?.['required']).toBeTruthy(); 
  });
  test('should show an error when date of birth is invalid', () => {
    const control = component.formUserRegister.controls['dateOfBirth'];
    control.setValue('2024-01-01');
    expect(control.errors?.['underage']).toBeTruthy(); 
  });
  test('should mark all fields as touched if form is invalid', () => {
    const markAllAsTouchedSpy = jest.spyOn(component.formUserRegister, 'markAllAsTouched');
    component.validateFormRegister();
    expect(markAllAsTouchedSpy).toHaveBeenCalled();
  });

  test('should navigate to home on successful registration',fakeAsync( () => {
    const userInfoSpy = jest.spyOn(component.userInfo, 'emit');
    component.formUserRegister.setValue({
      name: 'John',
      lastName: 'Doe',
      idDocument: '123456789',
      phoneNumber: '1234567890',
      dateOfBirth: '1990-01-01',
      email: 'john.doe@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
    });
    tick(1000);
    component.validateFormRegister();
    expect(userInfoSpy).toHaveBeenCalledWith({
      name: 'John',
      lastName: 'Doe',
      idDocument: '123456789',
      phoneNumber: '1234567890',
      dateOfBirth: '1990-01-01',
      email: 'john.doe@example.com',
      password: 'Password123!'
    });
  }));
  test('should update status.code when statusCode changes', () => {
     component.statusCode = 400;
     component.ngOnChanges({
       statusCode: { currentValue: 400, previousValue: null, firstChange: true, isFirstChange: () => true }
     });
     expect(component.status.code).toBe(400);
  });
});
