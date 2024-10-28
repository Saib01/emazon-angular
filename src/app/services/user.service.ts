import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { UserInfo } from '@models/user-info.model';
import { UserRegister } from '@models/user.model';
import { PROPERTY_EMAIL, PROPERTY_ID_DOCUMENT } from '@shared/constants/properties.constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getRole() {
    throw new Error('Method not implemented.');
  }
  private readonly API_USER = `${environment.API_URL_USER}/api/users`;
  private readonly PARAM_EMAIL=PROPERTY_EMAIL;
  private readonly PARAM_ID_DOCUMENT=PROPERTY_ID_DOCUMENT;
  user$=new BehaviorSubject<UserInfo|null>(null);
  constructor(private readonly http: HttpClient) {}
  createWarehouse(warehouseRegister: UserRegister) {
    return this.http.post(`${this.API_USER}/aux`, warehouseRegister, {
      context: checkToken()
    });
  }
  checkEmail(email: string) {
    const params = new HttpParams()
    .set(this.PARAM_EMAIL, email);
    return this.http.get<boolean>(`${this.API_USER}/validate-email`, { params: params});
  }
  checkIdDocument(idDocument: string) {
    const params = new HttpParams()
    .set(this.PARAM_ID_DOCUMENT, idDocument);
    return this.http.get<boolean>(`${this.API_USER}/validate-id-document`, { params: params});
  }
  
}
