import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '@services/token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private readonly tokenService:TokenService,
    private readonly router:Router){}
  canActivate():boolean{
    if (this.tokenService.getToken()!=='') {
      this.router.navigate(['panel/home']); 
      return false;
    } else {
      return true;
    }
  }
}
