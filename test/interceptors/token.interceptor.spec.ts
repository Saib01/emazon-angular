import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { checkToken, TokenInterceptor } from '@interceptors/token.interceptor';


describe('TokenInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
        }
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add an Authorization header with the token', () => {
    const testUrl = '/test';
    const expectedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBVVRISldUX0pPSEFOIiwic3ViIjoibWFpbEBtYWlsLmNvbSIsImF1dGhvcml0aWVzIjoiUk9MRV9BRE1JTiIsImlkIjoxLCJpYXQiOjE3Mjg5ODk5NzksImV4cCI6MTcyOTA3NjM3OSwianRpIjoiNGM3MGY4MWYtMjA4NS00NmVmLWEwM2QtYWE4NDY4ODAxYjcwIiwibmJmIjoxNzI4OTg5OTc5fQ.U5Z1FIcxFJ-n2dSLodP1rdT9UUfYTfQKS1obtd6uFDE';
    httpClient.get(testUrl,{context: checkToken()}).subscribe();

    const httpRequest = httpMock.expectOne(testUrl);

    expect(httpRequest.request.headers.get('Authorization')).toBe(`Bearer ${expectedToken}`);

    httpRequest.flush({});
  });

  it('should pass the request unchanged if there is no token', () => {
    const testUrl = '/test';

    httpClient.get(testUrl).subscribe();

    const httpRequest = httpMock.expectOne(testUrl);
    expect(httpRequest.request.headers.has('Authorization')).toBeFalsy();

    httpRequest.flush({});
  });
});
