import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowProductComponent } from './show-product.component';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { AuthService } from '@services/auth.service';
import { StockService } from '@services/stock.service';
import { ShoppingCartService } from '@services/shopping-cart.service';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import {  PRODUCT_URL } from '@shared/constants/product.constants';
import { Product } from '@models/product.model';
import { ShoppingCartRequest } from '@models/shopping-cart-request';
import { UserInfo } from '@models/user-info.model';
import { StatusResponseComponent } from '@shared/molecules/status-response/status-response.component';
import { DisplayFieldComponent } from '@shared/molecules/display-field/display-field.component';
import { ButtonComponent } from '@shared/atoms/button/button.component';
import { ResponseMessage } from '@models/response.model';

describe('ShowProductComponent', () => {
  let component: ShowProductComponent;
  let fixture: ComponentFixture<ShowProductComponent>;
  let router: jest.Mocked<Router>;
  let stockService: jest.Mocked<StockService>;
  let authService: jest.Mocked<AuthService>;
  let shoppingCartService: jest.Mocked<ShoppingCartService>;

  beforeEach(async () => {
    const routerMock = {
      navigate: jest.fn(),
      routerState: {
        snapshot:{
          url:  '/products/1'
        }
      }
    };
    const stockServiceMock = {
      getProduct: jest.fn()
    };
    const authServiceMock = {
      getUserStatus: jest.fn()
    };
    const shoppingCartServiceMock = {
      addToShoppingCart: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [ShowProductComponent,StatusResponseComponent,DisplayFieldComponent,ButtonComponent],
      providers: [
        FormBuilder,
        { provide: Router, useValue: routerMock },
        { provide: StockService, useValue: stockServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: ShoppingCartService, useValue: shoppingCartServiceMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowProductComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
    stockService = TestBed.inject(StockService) as jest.Mocked<StockService>;
    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
    shoppingCartService = TestBed.inject(ShoppingCartService) as jest.Mocked<ShoppingCartService>;
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });


    test('should call getProduct and set user', () => {
      const mockUserStatus:UserInfo = { id: '1', email: 'mail@mail.com',role: 'ADMIN' };
      const mockProduct: Product = {
        name: 'product1',
        description: 'description',
        amount: 1,
        price: 1000,
        brandResponse: {
          name: 'brand',
          description: 'description'
        },
        categoryResponseList: [{
          name: 'category',
          description: 'description'
        }]
      };
      (authService.getUserStatus as jest.Mock).mockReturnValue(of(mockUserStatus));
      (stockService.getProduct as jest.Mock).mockReturnValue(of(mockProduct));
      component.ngOnInit();

      expect(component.product).toEqual(mockProduct);
      expect(component.user).toEqual(mockUserStatus);
    });
    test('should navigate to products if id is not a number', () => {
      router.routerState.snapshot.url='/products/not-a-number';
      component.getProduct();
      expect(router.navigate).toHaveBeenCalledWith([PRODUCT_URL]);
    });

    test('should mark form as touched if form is invalid', () => {
      component.formAddToCart.setValue({ amount: { id: 0, name: '' } });

      component.addToShoppingCart();

      expect(component.formAddToCart.touched).toBeTruthy();
    });

    test('should navigate to login if user is null', () => {
      component.user = null;
      component.formAddToCart.setValue({ amount: { id: 5, name: '5' } });

      component.addToShoppingCart();

      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });

    test('should call addToShoppingCart on shoppingCartService if form is valid and user is not null', () => {
      const response: HttpResponse<ResponseMessage> = new HttpResponse({
        body: {
          message: 'Operation successful'
        },
        status: 200,
        statusText: 'OK',
        url: 'https://api.example.com/resource',
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
      const shoppingCartRequest:ShoppingCartRequest={
        idProduct:1,
        amount: 5,
      }
      component.formAddToCart.setValue({ amount: { id: 5, name: '5' } });
      component.id=1;
      component.user={ id: '1', email: 'mail@mail.com',role: 'ADMIN' };
      
      (shoppingCartService.addToShoppingCart as jest.Mock).mockReturnValue(of(response));

      component.addToShoppingCart();
      expect(shoppingCartService.addToShoppingCart).toBeCalledWith(shoppingCartRequest);
      expect(component.status.code).toEqual(200);
    });


    test('should call addToShoppingCart on shoppingCartService if form is valid and user is not null, should failed add product to shopping cart', () => { 
      const mockError = { status: 0 };
      const shoppingCartRequest:ShoppingCartRequest={
        idProduct:1,
        amount: 5,
      };
      component.formAddToCart.setValue({ amount: { id: 5, name: '5' } });
      component.id=1;
      component.user={ id: '1', email: 'mail@mail.com',role: 'ADMIN' };

      (shoppingCartService.addToShoppingCart as jest.Mock).mockReturnValueOnce(throwError(() => mockError ));
      component.addToShoppingCart();
      expect(shoppingCartService.addToShoppingCart).toBeCalledWith(shoppingCartRequest);
      expect(component.status.code).toEqual(0);
    });

    test('should return message with current month name if today is before or on restock date', () => {
      const restockDate = new Date().getDate() + 1;
      const today = new Date();
      const expectedMonthName = new Intl.DateTimeFormat('es', { month: 'long' }).format(today);

      const message = component.messageForInsufficientStock(restockDate);

      expect(message).toBe(`Insufficient stock. The next restock will be on day ${restockDate} of ${expectedMonthName}`);
  });

  test('should return message with next month name if today is after restock date', () => {
      const restockDate = new Date().getDate() - 1; 
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      const expectedMonthName = new Intl.DateTimeFormat('es', { month: 'long' }).format(nextMonth);

      const message = component.messageForInsufficientStock(restockDate);

      expect(message).toBe(`Insufficient stock. The next restock will be on day ${restockDate} of ${expectedMonthName}`);
  });

  });


