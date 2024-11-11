import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ResponseMessage } from '@models/response.model';
import { ShoppingCartRequest } from '@models/shopping-cart-request';
import { checkToken } from '@interceptors/token.interceptor';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  API_SHOPPING_CART = `${environment.API_URL_SHOPPING_CART}/api/shopping-cart`;

  constructor(private readonly http: HttpClient) {}

  addToShoppingCart(shoppingCartRequest:ShoppingCartRequest) {
    return this.http.post<ResponseMessage>(`${this.API_SHOPPING_CART}/add-product`,
      shoppingCartRequest,
      { context: checkToken(),
        observe: 'response'
       }
    );
  }
}