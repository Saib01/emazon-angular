import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Category } from '@models/category.model';
import { checkToken } from '@interceptors/token.interceptor';
import { ResponseMessage } from '@models/response.model';


@Injectable({
  providedIn: 'root',
})
export class StockService {
  private readonly API_STOCK = `${environment.API_URL_STOCK}/api/category/`;

  constructor(private readonly http: HttpClient) {}

  createCategory(category: Category) {
    return this.http.post<ResponseMessage>(this.API_STOCK, category, {
      context: checkToken()
    });
  }
  checkCategoryName(name: string) {
    return this.http.post<boolean>(`${this.API_STOCK}validate-name`, name, {
      context: checkToken()
    });
  }
}
