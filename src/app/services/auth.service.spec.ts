
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TokenService } from './token.service';
import { environment } from '@environments/environment';
import { UserLogin } from '@models/user.model';
import { ResponseLogin } from '@models/auth.model';
import { AuthService } from './auth.service';
import { UserInfo } from '@models/user-info.model';

describe('Service: Auth.service', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let tokenService: jest.Mocked<TokenService>;

  const userLogin: UserLogin = {
    username: 'testuser',
    password: 'password123'
  };

  const mockUserInfo:UserInfo={id: "4",
    email: "cliente@example.com",
    role: "ROLE_CLIENT"
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
  });

  afterEach(() => {
    httpMock.verify();
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
  test('should log in and fetch user info', () => {
    service.login(userLogin).subscribe(userInfo => {
      expect(userInfo).toEqual(mockUserInfo);
      expect(service.user$.value).toEqual(mockUserInfo);
      expect(tokenService.saveToken).toHaveBeenCalledWith(mockResponse.token);
    });

    const reqLogin = httpMock.expectOne(service.API_AUTH);
    expect(reqLogin.request.method).toBe('POST');
    reqLogin.flush(mockResponse); 

    const reqUserInfo = httpMock.expectOne(`${service.API_AUTH}/me`);
    expect(reqUserInfo.request.method).toBe('GET');
    reqUserInfo.flush(mockUserInfo); 
  });
  test('should set user$ to null when removerUser is called', () => {
    const userInfo:UserInfo={id: "4",
      email: "cliente@example.com",
      role: "ROLE_CLIENT"
    };
    service['user$'].next(userInfo);
    service.removerUser();
    expect(service.getUserStatus().getValue()).toBeNull();
  });

});
