

import { TestBed } from '@angular/core/testing';
import { ShoppingCartService } from './shopping-cart.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '@environments/environment';
import { ShoppingCartRequest } from '@models/shopping-cart-request';

describe('Service: ShoppingCart', () => {
  let shoppingCartService: ShoppingCartService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ShoppingCartService]
    });
    shoppingCartService = TestBed.inject( ShoppingCartService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
  test('should be created', () => {
    expect(shoppingCartService).toBeTruthy();
  });
  test('should send a POST request add a product to a shopping cart', () => {
    const shoppingCartRequest:ShoppingCartRequest = {
      idProduct: 4,
      amount: 5
    };

    shoppingCartService.addToShoppingCart(shoppingCartRequest).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.API_URL_SHOPPING_CART}/api/shopping-cart/add-product`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(shoppingCartRequest);
    req.flush('');
  });
});
