import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { TokenService } from '@services/token.service';

@Injectable({
  providedIn: 'root'
})
export class WarehouseGuard implements CanActivate {
  constructor(private readonly tokenService:TokenService,
    private readonly router:Router){}
  canActivate():boolean{
    const isValidToken=this.tokenService.isValidToken();
    if (isValidToken&&this.tokenService.getUserRole()?.includes('AUX_BODEGA')) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
  
}