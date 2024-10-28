import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { UserLogin } from '@models/user.model';
import { TokenService } from './token.service';
import { tap } from 'rxjs';
import { ResponseLogin } from '@models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient, private tokenService:TokenService) {}
  private readonly API_AUTH = `${environment.API_URL_USER}/api/auth`;
  login(userLogin: UserLogin) {
    return this.http.post<ResponseLogin>(this.API_AUTH, userLogin).pipe(
      tap(response=>{
        this.tokenService.saveToken(response.token);
      })
      );
  }

}
