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

  token:string="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBVVRISldUX0pPSEFOIiwic3ViIjoibWFpbEBtYWlsLmNvbSIsImF1dGhvcml0aWVzIjoiUk9MRV9BRE1JTiIsImlkIjoxLCJpYXQiOjE3Mjg5ODk5NzksImV4cCI6MTcyOTA3NjM3OSwianRpIjoiNGM3MGY4MWYtMjA4NS00NmVmLWEwM2QtYWE4NDY4ODAxYjcwIiwibmJmIjoxNzI4OTg5OTc5fQ.U5Z1FIcxFJ-n2dSLodP1rdT9UUfYTfQKS1obtd6uFDE";
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.context.get(CHECK_TOKEN)) {
    return this.addToken(request, next);
    }
    return next.handle(request);
  }

  private addToken(request: HttpRequest<unknown>, next: HttpHandler) {
    const accessToken = this.token;
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
      });
      return next.handle(authRequest);
    }
}
