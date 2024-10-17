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
    const expectedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBVVRISldUX0pPSEFOIiwic3ViIjoibWFpbEBtYWlsLmNvbSIsImF1dGhvcml0aWVzIjoiUk9MRV9BRE1JTiIsImlkIjoxLCJpYXQiOjE3MjkwNzg5MTMsImV4cCI6MTcyOTE2NTMxMywianRpIjoiYTJkZTliOWUtMWRhNS00NjBmLWI5MjAtZWZlMTliYTY0OTlhIiwibmJmIjoxNzI5MDc4OTEzfQ.3mViA-EJMxg7sKT3fGpRVlLwzOtePOD3n488OIfanbA';
    httpClient.get(testUrl,{context: checkToken()}).subscribe();

    const httpRequest = httpMock.expectOne(testUrl);

    expect(httpRequest.request.headers.get('Authorization')).toContain(`Bearer`);

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
