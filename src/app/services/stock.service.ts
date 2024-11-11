import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '@environments/environment';
import { BasicInfo } from '@models/basic-Info.model';
import { checkToken } from '@interceptors/token.interceptor';
import { ResponseMessage } from '@models/response.model';
import { Page } from '@models/page.model';
import { Observable } from 'rxjs';
import {Product, ProductRequest } from '@models/product.model';


@Injectable({
  providedIn: 'root',
})
export class StockService {
  private readonly API_STOCK_CATEGORY = `${environment.API_URL_STOCK}/api/category`;
  private readonly API_STOCK_BRAND = `${environment.API_URL_STOCK}/api/brand`;
  private readonly API_STOCK_PRODUCT = `${environment.API_URL_STOCK}/api/product`;
  private readonly PARAM_SORT_DIRECTION='sortDirection';
  private readonly PARAM_PAGE_NUMBER='page';
  private readonly PARAM_PAGE_SIZE='size';
  private readonly PARAM_SORT_BY='sortBy';
  constructor(private readonly http: HttpClient) {}

  createCategory(category: BasicInfo) {
    return this.http.post<ResponseMessage>(`${this.API_STOCK_CATEGORY}/`, category, {
      context: checkToken(),
      observe: 'response'
    });
  }
  checkCategoryName(name: string) {
    return this.http.post<boolean>(`${this.API_STOCK_CATEGORY}/validate-name`, name, {
    });
  }
  getCategories(sortDirection: string, page: number, size: number) : Observable<Page<BasicInfo>>{
    const params = this.setParams(sortDirection, page, size);
    return this.http.get<Page<BasicInfo>>(
      `${this.API_STOCK_CATEGORY}`, { params: params}
    );
  }
  createBrand(brand: BasicInfo) {
    return this.http.post<ResponseMessage>(`${this.API_STOCK_BRAND}/`, brand, {
      context: checkToken(),
      observe: 'response'
    });
  }
  checkBrandName(name: string) {
    return this.http.post<boolean>(`${this.API_STOCK_BRAND}/validate-name`, name, {
    });
  }
  getBrands(sortDirection: string, page: number, size: number) : Observable<Page<BasicInfo>>{
    const params = this.setParams(sortDirection, page, size);
    return this.http.get<Page<BasicInfo>>(
      `${this.API_STOCK_BRAND}`, { params: params}
    );
  }

  createProduct(product: ProductRequest ) {
    return this.http.post<ResponseMessage>(`${this.API_STOCK_PRODUCT}/`, product, {
      context: checkToken(),
      observe: 'response'
    });
  }
  checkProductName(name: string) {
    return this.http.post<boolean>(`${this.API_STOCK_PRODUCT}/validate-name`, name, {
    });
  }
  getProducts(sortDirection: string, page: number, size: number,sortBy:string) : Observable<Page<Product>>{
    const params = this.setParams(sortDirection, page, size,sortBy);
    return this.http.get<Page<Product>>(
      `${this.API_STOCK_PRODUCT}`, { params: params}
    );
  }

  getProduct(productId:number) : Observable<Product>{
    return this.http.get<Product>(
      `${this.API_STOCK_PRODUCT}/${productId}`
    );
  }

  private setParams(sortDirection: string, page: number, size: number,sortBy?:string) {
    let params=new HttpParams()
      .set(this.PARAM_SORT_DIRECTION, sortDirection)
      .set(this.PARAM_PAGE_NUMBER, page.toString())
      .set(this.PARAM_PAGE_SIZE, size.toString());
      return sortBy ? params.set(this.PARAM_SORT_BY, sortBy) : params;
  }
}
