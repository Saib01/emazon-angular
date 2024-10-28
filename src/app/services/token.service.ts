import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  saveToken(token:string){
    setCookie('token-emazon',token);
  }
  getToken(){
    const token=getCookie('token-emazon');
    return token;
  }
  removeToken(){
    removeCookie('token-emazon');
  }

  isValidToken(){
    const token=this.getToken();
    if(!token){
      return false;
    }
    const decodeToken=jwtDecode<JwtPayload>(token);
    if(decodeToken&&decodeToken?.exp){
      const tokenDate=new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today=new Date();
      return tokenDate.getTime()>today.getTime();
    }
    return false;
  }
  /*
  getRole(){
    const token=this.getToken();
    if(!token||this.isValidToken()){
      return '';//AUX_BODEGA
    }
    const decodeToken=jwtDecode<JwtPayload>(token);
    return decodeToken.sub;
  }
*/
}
