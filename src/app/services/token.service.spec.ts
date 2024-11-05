import { TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from './token.service';
import { jwtDecode } from 'jwt-decode';
import { UserInfo } from '@models/user-info.model';

jest.mock('jwt-decode'); 

describe('Service: Token', () => {
  let tokenService: TokenService;
  let cookieService: CookieService;

  beforeEach(() => {
    const cookieServiceMock = {
      set: jest.fn(),
      get: jest.fn(),
      delete: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        TokenService,
        { provide: CookieService, useValue: cookieServiceMock }
      ]
    });

    tokenService = TestBed.inject(TokenService);
    cookieService = TestBed.inject(CookieService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should save a token', () => {
    const token = 'test-token';
    tokenService.saveToken(token);
    expect(cookieService.set).toHaveBeenCalledWith('token-emazon', token, { path: '/', expires: 1 });
  });

  test('should get a token', () => {
    const token = 'test-token';
    (cookieService.get as jest.Mock).mockReturnValue(token);

    const result = tokenService.getToken();

    expect(result).toBe(token);
    expect(cookieService.get).toHaveBeenCalledWith('token-emazon');
  });

  test('should return null if no token exists', () => {
    (cookieService.get as jest.Mock).mockReturnValue('');

    const result = tokenService.getToken();

    expect(result).toBe('');
  });

  test('should remove a token', () => {
    tokenService.removeToken();
    expect(cookieService.delete).toHaveBeenCalledWith('token-emazon', '/');
  });



});
