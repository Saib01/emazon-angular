import { StatusResponseComponent } from './status-response.component';
import { HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';
import { CONNECTION_ERROR, SERVER_ERROR } from '@shared/constants/server-error.constants';
import { Status } from '@models/status.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { USER_TITTLE_ERROR, USER_TITTLE_SUCCESSFULLY } from '@shared/constants/user.constants';
import { ButtonComponent } from '@shared/atoms/button/button.component';


describe('StatusResponseComponent', () => {
  let component:StatusResponseComponent;
  let fixture: ComponentFixture<StatusResponseComponent>;
  let router: Partial<Router>;

  beforeEach(async () => {
    router = {
      navigate: jest.fn(),
      url: '/current/path'
    };

    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [StatusResponseComponent,ButtonComponent],
      providers: [
        { provide: Router, useValue: router },
      ]
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusResponseComponent);
    component = fixture.componentInstance;
    component.status= {
      code: null,
      messages: new Map([[HttpStatusCode.Created, '']]),
      tittles: new Map([[true, USER_TITTLE_SUCCESSFULLY],[false, USER_TITTLE_ERROR]])
    } 
    fixture.detectChanges();
  });

    test('should navigate back when status code is 404', () => {
      component.status = { code: HttpStatusCode.NotFound, messages: new Map(), tittles: new Map() } as Status;
      component.navigateBack();
      expect(router.navigate).toHaveBeenCalledWith(['/current']);
      expect(component.status.code).toBeNull();
    });

    test('should navigate back when status code is between 200 and 299', () => {
      component.status = { code: 200, messages: new Map(), tittles: new Map() } as Status;
      component.navigateBack();
      expect(router.navigate).toHaveBeenCalledWith(['/current']);
      expect(component.status.code).toBeNull();
    });

    test('should not navigate when status code is not 404 or in the 200-299 range', () => {
      component.status = { code: 500, messages: new Map(), tittles: new Map() } as Status;
      component.navigateBack();
      expect(router.navigate).not.toHaveBeenCalled();
      expect(component.status.code).toBeNull();
    });

    test('should return the correct title for a valid status code', () => {
      component.status = {
        code: 200,
        messages: new Map(),
        tittles: new Map([[true, 'Success'], [false, 'Error']]),
      } as Status;
      expect(component.getTittle()).toBe('Success');
    });

    test('should return null if status code is null', () => {
      component.status = { code: null, messages: new Map(), tittles: new Map() } as Status;
      expect(component.getTittle()).toBeNull();
    });

    test('should return the correct error message for status code 0', () => {
      component.status = { code: 0, messages: new Map(), tittles: new Map() } as Status;
      expect(component.getMessage()).toBe(CONNECTION_ERROR);
    });

    test('should return the correct error message for status code 500', () => {
      component.status = { code: 500, messages: new Map(), tittles: new Map() } as Status;
      expect(component.getMessage()).toBe(SERVER_ERROR);
    });

    test('should return the status message for other status codes', () => {
      component.status = {
        code: 404,
        messages: new Map([[404, 'Not Found']]),
        tittles: new Map(),
      } as Status;
      expect(component.getMessage()).toBe('Not Found');
    });

    test('should return null if status code is null', () => {
      component.status = { code: null, messages: new Map(), tittles: new Map() } as Status;
      expect(component.getMessage()).toBeNull();
    });
});
