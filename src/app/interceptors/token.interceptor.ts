import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken,
  HttpContext,
} from '@angular/common/http';
import { Observable } from 'rxjs';

const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);

export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true);
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  token:string="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBVVRISldUX0pPSEFOIiwic3ViIjoibWFpbEBtYWlsLmNvbSIsImF1dGhvcml0aWVzIjoiUk9MRV9BRE1JTiIsImlkIjoxLCJpYXQiOjE3Mjg0NzAyNDksImV4cCI6MTcyODU1NjY0OSwianRpIjoiOTNhZDMyYzQtNTk1ZS00Njk1LWE1MzMtNWZlM2JjZDFhMWQ4IiwibmJmIjoxNzI4NDcwMjQ5fQ.CWLn9DTcVmXve8nG-V0s20NdEA6iXrhdc-hPAGex0RM";
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.addToken(request, next);
  }

  private addToken(request: HttpRequest<unknown>, next: HttpHandler) {
    const accessToken = this.token;
    if (accessToken) {
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
      });
      return next.handle(authRequest);
    }
    return next.handle(request);
  }
}
