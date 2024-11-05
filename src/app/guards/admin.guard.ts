import { Injectable } from '@angular/core';
import {  CanActivate, Router} from '@angular/router';
import { AuthService } from '@services/auth.service';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate{
  constructor(private readonly authService:AuthService,
    private readonly router:Router){}

    canActivate(): Observable<boolean> {
      return this.authService.getUserStatus().pipe(
        map(userStatus => {
          return userStatus?.role?.includes('ADMIN') || false;
        }),
        tap(isAuthorized => {
          if (!isAuthorized) {
            this.router.navigate(['login']);
          }
        })
      );
    }
  }