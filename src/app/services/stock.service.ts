import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '@environments/environment';
import { BasicInfo } from '@models/BasicInfo.model';
import { checkToken } from '@interceptors/token.interceptor';
import { ResponseMessage } from '@models/response.model';
import { Page } from '@models/page.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class StockService {
  private readonly API_STOCK_CATEGORY = `${environment.API_URL_STOCK}/api/category`;
  private readonly API_STOCK_BRAND = `${environment.API_URL_STOCK}/api/brand`;
  constructor(private readonly http: HttpClient) {}

  createCategory(category: BasicInfo) {
    return this.http.post<ResponseMessage>(`${this.API_STOCK_CATEGORY}/`, category, {
      context: checkToken()
    });
  }
  checkCategoryName(name: string) {
    return this.http.post<boolean>(`${this.API_STOCK_CATEGORY}/validate-name`, name, {
      context: checkToken()
    });
  }
  getCategories(sortDirection: string, page: number, size: number) : Observable<Page<BasicInfo>>{
    const params = new HttpParams()
      .set('sortDirection', sortDirection)
      .set('page', page.toString())
      .set('size', size.toString());
  
    return this.http.get<Page<BasicInfo>>(
      `${this.API_STOCK_CATEGORY}`, { params: params}
    );
  }

  createBrand(brand: BasicInfo) {
    return this.http.post<ResponseMessage>(`${this.API_STOCK_BRAND}/`, brand, {
      context: checkToken()
    });
  }
  checkBrandName(name: string) {
    return this.http.post<boolean>(`${this.API_STOCK_BRAND}/validate-name`, name, {
      context: checkToken()
    });
  }
  getBrands(sortDirection: string, page: number, size: number) : Observable<Page<BasicInfo>>{
    const params = new HttpParams()
      .set('sortDirection', sortDirection)
      .set('page', page.toString())
      .set('size', size.toString());
  
    return this.http.get<Page<BasicInfo>>(
      `${this.API_STOCK_BRAND}`, { params: params}
    );
  }
}
