import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import {NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from '@services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserRegister } from '@models/user.model';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userServiceMock: Partial<UserService>;
  let routerMock: Partial<Router>;
  const userRegister:UserRegister={
    name: 'John',
    lastName: 'Doe',
    idDocument: '123456789',
    phoneNumber: '1234567890',
    dateOfBirth: '1990-01-01',
    email: 'john.doe@example.com',
    password: 'Password123!'
  };
  beforeEach(async () => {
    userServiceMock = {
      createClient: jest.fn().mockReturnValue(of({}))
    };

    routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  test('should navigate to home on successful registration',fakeAsync( () => {
    (routerMock.navigate as jest.Mock).mockReturnValueOnce(Promise.resolve(true));
    component.validateClient(userRegister);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  }));

  test('should handle error on registration failure',fakeAsync( () => { 
    const mockError = { status: 400 };
    (userServiceMock.createClient as jest.Mock).mockReturnValueOnce(
      throwError(() => mockError )
    );
    component.validateClient(userRegister);
    expect(component.statusCode).toBe(400);
  }));
});
