import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Category } from '@models/category.model';
import { checkToken } from '@interceptors/token.interceptor';


@Injectable({
  providedIn: 'root',
})
export class StockService {
  private readonly API_STOCK = `${environment.API_URL_STOCK}/api/category/`;

  constructor(private readonly http: HttpClient) {}

  create(dto: Category) {
    return this.http.post<Category>(this.API_STOCK, dto, {
      context: checkToken()
    });
  }
  checkName(name: string) {
    return this.http.post<boolean>(`${this.API_STOCK}validate-name`, name, {
      context: checkToken()
    });
  }
}
