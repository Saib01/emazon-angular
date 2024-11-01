

import { TestBed } from '@angular/core/testing';
import {UserService } from './user.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from '@environments/environment';
import { UserRegister } from '@models/user.model';
import { PROPERTY_EMAIL, PROPERTY_ID_DOCUMENT } from '@shared/constants/properties.constants';

describe('Service: Auth', () => {
  let userService: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  test('should be created', () => {
    expect( userService).toBeTruthy();
  });

  test('should send a POST request to create a warehouse', () => {
    const warehouseRegister: UserRegister = {
      email: 'test@example.com',
      idDocument: '12345678',
    };

    userService.createWarehouse(warehouseRegister).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.API_URL_USER}/api/users/aux`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(warehouseRegister);
  });

  test('should send a GET request to validate email', () => {
    const email = 'test@example.com';
    const expectedResponse = true;

    userService.checkEmail(email).subscribe(response => {
      expect(response).toBe(expectedResponse);
    });

    const req = httpMock.expectOne(`${environment.API_URL_USER}/api/users/validate-email?${PROPERTY_EMAIL}=${email}`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedResponse);
  });

  test('should send a GET request to validate ID document', () => {
    const idDocument = '12345678';
    const expectedResponse = true;

    userService.checkIdDocument(idDocument).subscribe(response => {
      expect(response).toBe(expectedResponse);
    });

    const req = httpMock.expectOne(`${environment.API_URL_USER}/api/users/validate-id-document?${PROPERTY_ID_DOCUMENT}=${idDocument}`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedResponse);
  });
});


