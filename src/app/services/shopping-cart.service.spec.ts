

import { TestBed } from '@angular/core/testing';
import { ShoppingCartService } from './shopping-cart.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '@environments/environment';
import { ShoppingCartRequest } from '@models/shopping-cart-request';
import { Page } from '@models/page.model';
import { ShoppingCartItem } from '@models/shopping-cart-item';
describe('Service: ShoppingCart', () => {
  let shoppingCartService: ShoppingCartService;
  let httpMock: HttpTestingController;
  const userShoppingCart:Page<ShoppingCartItem>= {
    content: [{
      id: 1,
      name:'as',
      amount: 38595,
      brandResponse:{id:8, name:'ab'},
      categoryResponseList:[{id:8, name:'ab'}],
      price:12,
      unitsInCart:2
  }], 
    totalElements: 1,
    totalPages: 1,
    pageNumber: 1,
    first: true,
    last: true,
    pageSize: 10,
    numberOfElements: 1,
    ascending: false,
    empty: true
  };
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
  test('should retrieve the total number of products in the shopping cart', () => {

    shoppingCartService.getTotalProductsInShoppingCart().subscribe(response => {
      expect(response).toBe(5);
    });

    const req = httpMock.expectOne(`${environment.API_URL_SHOPPING_CART}/api/shopping-cart/total`);
    expect(req.request.method).toBe('GET');
    req.flush(5);
  });

  test('should retrieve the total number of products in the shopping cart', () => {

    shoppingCartService.getTotalProductsInShoppingCart().subscribe(response => {
      expect(response).toBe(null);
    });

    const req = httpMock.expectOne(`${environment.API_URL_SHOPPING_CART}/api/shopping-cart/total`);
    expect(req.request.method).toBe('GET');
    req.flush(null);
  });

  test('should retrieve the shopping cart without filter', () => {   
    shoppingCartService.getShoppingCart('ASC',1,1,'','').subscribe(response => {
      expect(response).toBe(userShoppingCart);
    });

    const req = httpMock.expectOne(`${environment.API_URL_SHOPPING_CART}/api/shopping-cart/products?sortDirection=ASC&page=1&size=1`);
    expect(req.request.method).toBe('GET');
    req.flush(userShoppingCart);
  });
  test('should retrieve the shopping cart with filter', () => {
    shoppingCartService.getShoppingCart('ASC',1,1,'ab','ab').subscribe(response => {
      expect(response).toBe(userShoppingCart);
    });

    const req = httpMock.expectOne(`${environment.API_URL_SHOPPING_CART}/api/shopping-cart/products?sortDirection=ASC&page=1&size=1&brandName=ab&categoryName=ab`);
    expect(req.request.method).toBe('GET');
    req.flush(userShoppingCart);
  });
  /*
     const name = 'Valid Name';
    const isValid = true;

    service.checkCategoryName(name).subscribe((response) => {
      expect(response).toBe(isValid);
    });

    const req = httpMock.expectOne(`${environment.API_URL_STOCK}/api/category/validate-name`);
    expect(req.request.method).toBe('POST'); 
    req.flush(isValid); 
  */
});
