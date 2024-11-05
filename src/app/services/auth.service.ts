import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { UserLogin } from '@models/user.model';
import { TokenService } from './token.service';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { ResponseLogin } from '@models/auth.model';
import { UserInfo } from '@models/user-info.model';
import { checkToken } from '@interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$=new BehaviorSubject<UserInfo|null>(null);
  constructor(private readonly http: HttpClient, private readonly tokenService:TokenService) {}
  API_AUTH = `${environment.API_URL_USER}/api/auth`;
  login(userLogin: UserLogin) {
    return this.http.post<ResponseLogin>(this.API_AUTH, userLogin).pipe(
      tap(response => {
        this.tokenService.saveToken(response.token);
      }),
      switchMap(() => this.getUser())
    );
  }
  getUser(){
    return this.http.get<UserInfo>(`${this.API_AUTH}/me`,{
      context: checkToken()
    }).pipe(
      tap(response=>{
        this.user$.next(response);
      })
      );
  }
  removerUser() {
    this.user$.next(null);
  }
  getUserStatus(){
    return this.user$;
  }
}
