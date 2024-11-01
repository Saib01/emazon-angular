import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CreateWarehouseAssistantComponent } from './create-warehouse-assistant.component';

import {NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from '@services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CreateWarehouseAssistantComponent', () => {
  let component: CreateWarehouseAssistantComponent;
  let fixture: ComponentFixture<CreateWarehouseAssistantComponent>;
  let userServiceMock: Partial<UserService>;
  let routerMock: Partial<Router>;

  beforeEach(async () => {
    userServiceMock = {
      createWarehouse: jest.fn().mockReturnValue(of({message: 'Category created'})), 
      checkEmail: jest.fn().mockReturnValue(of({notAvailableEmail:true})), 
      checkIdDocument: jest.fn().mockReturnValue(of({notAvailableIdDocument:true})), 
    };

    routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [CreateWarehouseAssistantComponent],
      imports: [ReactiveFormsModule,HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateWarehouseAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create the form with correct controls and validations', () => {
    const form = component.formWarehouse;

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
    const control = component.formWarehouse.controls['email'];
    control.setValue('wrongEmail');
    expect(control.errors?.['pattern']).toBeTruthy(); 
  });
  test('should show an error when email is empty or null', () => {
    const control = component.formWarehouse.controls['email'];
    expect(control.errors?.['whitespace']).toBeTruthy(); 
  });
  test('should show an error when phone number is empty or null', () => {
    const control = component.formWarehouse.controls['phoneNumber'];
    expect(control.errors?.['whitespace']).toBeTruthy(); 
  });
  test('should show an error when phone number is invalid', () => {
    const control = component.formWarehouse.controls['phoneNumber'];
    control.setValue('222222222222222222222222222222222222222222');
    expect(control.errors?.['pattern']).toBeTruthy(); 
  });
  test('should show an error when date of birth is empty or null', () => {
    const control = component.formWarehouse.controls['dateOfBirth'];
    expect(control.errors?.['required']).toBeTruthy(); 
  });
  test('should show an error when date of birth is invalid', () => {
    const control = component.formWarehouse.controls['dateOfBirth'];
    control.setValue('2024-01-01');
    expect(control.errors?.['underage']).toBeTruthy(); 
  });
  test('should mark all fields as touched if form is invalid', () => {
    const markAllAsTouchedSpy = jest.spyOn(component.formWarehouse, 'markAllAsTouched');
    component.validateWarehouse();
    expect(markAllAsTouchedSpy).toHaveBeenCalled();
  });
  test('should navigate to home on successful registration',fakeAsync( () => {
    component.formWarehouse.setValue({
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
    component.validateWarehouse();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/panel/home']);
  }));

  test('should handle error on registration failure',fakeAsync( () => { 
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    (userServiceMock.createWarehouse as jest.Mock).mockReturnValueOnce(
      throwError(() => new Error('Communication Error'))
    );

    component.formWarehouse.setValue({
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
    component.validateWarehouse();
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.any(Error));
  }));
});
