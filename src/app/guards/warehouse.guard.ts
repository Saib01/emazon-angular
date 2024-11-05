import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '@services/auth.service';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarehouseGuard implements CanActivate {
  constructor(private readonly authService:AuthService,
    private readonly router:Router){}

    canActivate(): Observable<boolean> {
      return this.authService.getUserStatus().pipe(
        map(userStatus => {
          return userStatus?.role?.includes('AUX_BODEGA') || false;
        }),
        tap(isAuthorized => {
          if (!isAuthorized) {
            this.router.navigate(['login']);
          }
        })
      );
    }
}