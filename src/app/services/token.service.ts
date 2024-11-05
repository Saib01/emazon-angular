import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly tokenKey = 'token-emazon';
  constructor(private readonly cookieService: CookieService) {}
  saveToken(token: string): void {
    this.cookieService.set(this.tokenKey, token, { path: '/', expires: 1 }); 
  }
  getToken(){
    const token=this.cookieService.get(this.tokenKey) ;
    if(!token){
      return '';
    }
    return token;
  }
  removeToken(){
    this.cookieService.delete(this.tokenKey, '/');
  }
}
