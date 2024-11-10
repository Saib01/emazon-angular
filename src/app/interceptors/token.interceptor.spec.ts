import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { checkToken, TokenInterceptor } from '@interceptors/token.interceptor';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TokenService } from '@services/token.service';


describe('TokenInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let tokenService: TokenService;

  beforeEach(() => {
    const tokenServiceSpy = {
      isValidToken: jest.fn(),
      getToken: jest.fn(),
    };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
        },
        { provide: TokenService, useValue: tokenServiceSpy }
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  test('should add an Authorization header with the token', () => {
    const mockToken = 'mockToken123';
    (tokenService.getToken as jest.Mock).mockReturnValueOnce(mockToken);

    const testUrl = '/test';
    httpClient.get(testUrl,{context: checkToken()}).subscribe();

    const httpRequest = httpMock.expectOne(testUrl);

    expect(httpRequest.request.headers.get('Authorization')).toContain(`Bearer`);

    httpRequest.flush({});
  });

  test('should pass the request unchanged if there is no token', () => {
    const testUrl = '/test';

    httpClient.get(testUrl).subscribe();

    const httpRequest = httpMock.expectOne(testUrl);
    expect(httpRequest.request.headers.has('Authorization')).toBeFalsy();

    httpRequest.flush({});
  });

  test('should add an Authorization header with an empty token if no token is set', () => {
    const mockToken = null;
    (tokenService.getToken as jest.Mock).mockReturnValueOnce(mockToken);

    const testUrl = '/test';
    httpClient.get(testUrl,{context: checkToken()}).subscribe();

    const httpRequest = httpMock.expectOne(testUrl);

    expect(httpRequest.request.headers.has('Authorization')).toBeFalsy();

    httpRequest.flush({});
  });
});
