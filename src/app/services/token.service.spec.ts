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

  test('should validate a token', () => {
    const token = 'test-token';
    (cookieService.get as jest.Mock).mockReturnValue(token);
    (jwtDecode as jest.Mock).mockReturnValue({ exp: Math.floor(Date.now() / 1000) + 60 });

    const result = tokenService.isValidToken();

    expect(result).toBe(true);
  });

  test('should return false if token is expired', () => {
    const token = 'test-token';
    (cookieService.get as jest.Mock).mockReturnValue(token);
    (jwtDecode as jest.Mock).mockReturnValue({ exp: Math.floor(Date.now() / 1000) - 60 });

    const result = tokenService.isValidToken();

    expect(result).toBe(false);
  });

  test('should return false if token is invalid', () => {
    (cookieService.get as jest.Mock).mockReturnValue('invalid-token');
    (jwtDecode as jest.Mock).mockImplementation(() => { throw new Error('Invalid token'); });

    const result = tokenService.isValidToken();

    expect(result).toBe(false);
  });

  test('should return user role', () => {
    const token = 'test-token';
    (cookieService.get as jest.Mock).mockReturnValue(token);
    (jwtDecode as jest.Mock).mockReturnValue({ authorities: ['ROLE_ADMIN'] });

    const result = tokenService.getUserRole();

    expect(result.toString()).toBe('ROLE_ADMIN');
  });

  test('should return user ID', () => {
    const token = 'test-token';
    (cookieService.get as jest.Mock).mockReturnValue(token);
    (jwtDecode as jest.Mock).mockReturnValue({ id: '12345' });

    const result = tokenService.getUserId();

    expect(result).toBe('12345');
  });

  test('should return user email', () => {
    const token = 'test-token';
    (cookieService.get as jest.Mock).mockReturnValueOnce(token);
    (jwtDecode as jest.Mock).mockReturnValueOnce({ sub: '1test@example.com' });

    const result = tokenService.getUserEmail();

    expect(result).toBe('1test@example.com');
  });

  test('should return empty string if no token exists for email', () => {
    (cookieService.get as jest.Mock).mockReturnValue(null);

    const result = tokenService.getUserEmail();

    expect(result).toBe('');
  });

  test('should return null if token claims are invalid', () => {
    (cookieService.get as jest.Mock).mockReturnValueOnce('invalid-token');
    (jwtDecode as jest.Mock).mockImplementation(() => { throw new Error('Invalid token'); });

    const result = tokenService.getTokenClaims();

    expect(result).toBeNull();
  });

  test('should return claims if token is valid', () => {
    const token = 'test-token';
    (cookieService.get as jest.Mock).mockReturnValue(token);
    const claims = { id: '123', authorities: ['ROLE_ADMIN'] };
    (jwtDecode as jest.Mock).mockReturnValue(claims);

    const result = tokenService.getTokenClaims();

    expect(result).toEqual(claims);
  });

  it('should return user info with valid token', () => {
    const mockId = '12345';
    const mockEmail = 'test@example.com';
    const mockRole = 'USER';
    jest.spyOn(tokenService, 'getUserId').mockReturnValue(mockId);
    jest.spyOn(tokenService, 'getUserEmail').mockReturnValue(mockEmail);
    jest.spyOn(tokenService, 'getUserRole').mockReturnValue(mockRole);

    const userInfo: UserInfo | null = tokenService.getUser();

    expect(userInfo).toEqual({
      id: mockId,
      email: mockEmail,
      role: mockRole
    });
    expect(tokenService.getUserId).toHaveBeenCalled();
    expect(tokenService.getUserEmail).toHaveBeenCalled();
    expect(tokenService.getUserRole).toHaveBeenCalled();
  });

  it('should return null if user info methods return undefined', () => {
    jest.spyOn(tokenService, 'getUserId').mockReturnValue('');
    jest.spyOn(tokenService, 'getUserEmail').mockReturnValue('');
    jest.spyOn(tokenService, 'getUserRole').mockReturnValue('');

    const userInfo: UserInfo | null = tokenService.getUser();

    expect(userInfo).toEqual({
      id: '',
      email: '',
      role: ''
    });
  });

});
