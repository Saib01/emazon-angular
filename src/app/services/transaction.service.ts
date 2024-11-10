import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { SupplyRequest } from '@models/supply-request.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  API_TRANSACTION = `${environment.API_URL_TRANSACTION}/api/supply`;

  constructor(private readonly http: HttpClient) {}

  addProductSupply(supplyRequest: SupplyRequest) {
    return this.http.put(`${this.API_TRANSACTION}`, supplyRequest,{
      context: checkToken(),
      observe: 'response'
    });
  }
}
