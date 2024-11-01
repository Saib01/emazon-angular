
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TokenService } from './token.service';
import { environment } from '@environments/environment';
import { UserLogin } from '@models/user.model';
import { ResponseLogin } from '@models/auth.model';
import { AuthService } from './auth.service';

describe('Service: Auth.service', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let tokenService: TokenService;

  const mockUserLogin: UserLogin = {
    username: 'testuser',
    password: 'password123'
  };

  const mockResponse: ResponseLogin = {
    token: 'mocked-token'
  };

  beforeEach(() => {
    const tokenServiceSpy = { saveToken: jest.fn() };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: TokenService, useValue: tokenServiceSpy }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should save token on successful login', () => {
    service.login(mockUserLogin).subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(tokenService.saveToken).toHaveBeenCalledWith(mockResponse.token);
    });

    const req = httpMock.expectOne(`${environment.API_URL_USER}/api/auth`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  test('should call saveToken with the token from the response', () => {
    service.login(mockUserLogin).subscribe();

    const req = httpMock.expectOne(`${environment.API_URL_USER}/api/auth`);
    req.flush(mockResponse);

    expect(tokenService.saveToken).toHaveBeenCalledWith('mocked-token');
  });
});
