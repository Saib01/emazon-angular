import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ResponseMessage } from '@models/response.model';
import { ShoppingCartRequest } from '@models/shopping-cart-request';
import { checkToken } from '@interceptors/token.interceptor';
import { Page } from '@models/page.model';
import { ShoppingCartItem } from '@models/shopping-cart-item';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private readonly PARAM_SORT_DIRECTION='sortDirection';
  private readonly PARAM_PAGE_NUMBER='page';
  private readonly PARAM_PAGE_SIZE='size';
  private readonly BRAND_NAME='brandName';
  private readonly CATEGORY_NAME='categoryName';
  API_SHOPPING_CART = `${environment.API_URL_SHOPPING_CART}/api/shopping-cart`;
  total$=new BehaviorSubject<number>(0);
  constructor(private readonly http: HttpClient) {}

  addToShoppingCart(shoppingCartRequest:ShoppingCartRequest) {
    return this.http.post<ResponseMessage>(`${this.API_SHOPPING_CART}/add-product`,
      shoppingCartRequest,
      { context: checkToken(),
        observe: 'response'
       }
    ).pipe(
      tap(()=>{
        this.total$.next(this.total$.value+shoppingCartRequest.amount);
      })
    );
  }

  removeFromShoppingCart(id:number){
    return this.http.post<ResponseMessage>(`${this.API_SHOPPING_CART}/remove-product/${id}`,
      { context: checkToken(),
        observe: 'response'
       }
    );
  }
  
  getTotalProductsInShoppingCart() {
    return this.http.get<number>(`${this.API_SHOPPING_CART}/total`, {
        context: checkToken(),
        observe: 'response'
      }).pipe(
        tap(response => {
          this.total$.next(response.body ? response.body : 0);
        }),
        switchMap(() => this.total$)
      );
  }
  getShoppingCart(sortDirection: string, page: number, size: number,brandName:string,categoryName:string) : Observable<Page<ShoppingCartItem>>{
    let params=new HttpParams()
      .set(this.PARAM_SORT_DIRECTION, sortDirection)
      .set(this.PARAM_PAGE_NUMBER, page.toString())
      .set(this.PARAM_PAGE_SIZE, size.toString());
      if (brandName) {
        params = params.set(this.BRAND_NAME, brandName);
      }
      if (categoryName ) {
        params = params.set(this.CATEGORY_NAME, categoryName);
      }
    return this.http.get<Page<ShoppingCartItem>>(
      `${this.API_SHOPPING_CART}/products`, { params: params,context: checkToken()}
    );
  }

}