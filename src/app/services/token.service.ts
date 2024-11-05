import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { UserInfo } from '../models/user-info.model';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly tokenKey = 'token-emazon';
  constructor(private readonly cookieService: CookieService) {}
  getUser(): UserInfo | null {
    return {    
      id: this.getUserId(),
      email: this.getUserEmail(),
      role: this.getUserRole()
    };
  }

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

  isValidToken(){
    const token=this.getToken();
    try {
      const { exp } = jwtDecode<JwtPayload>(token);
      return exp ? new Date(exp * 1000) > new Date() : false;
    } catch {
      return false;
    }
  }
  
  getUserRole(): string {
    const claims = this.getTokenClaims();
    return claims ? claims['authorities'] : '';
  }
  getUserId(): string {
    const claims = this.getTokenClaims();
    console.log(claims);
    return claims ? claims['id'] : '';
  }
  getUserEmail(): string {
    const token=this.getToken();
    let result='';
    try {
      const { sub} = jwtDecode<JwtPayload>(token);
      result=sub??'';
    }catch{}
    return result;
  }
  getTokenClaims(): any {
    const token=this.getToken();
    if(token){
    try {
      return jwtDecode(token);
    } catch (error) {
      console.log('Invalid Token', error);
      return null;
    }
  }
}
}
