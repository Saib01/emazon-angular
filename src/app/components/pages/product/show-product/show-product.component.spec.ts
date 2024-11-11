import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowProductComponent } from './show-product.component';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { AuthService } from '@services/auth.service';
import { StockService } from '@services/stock.service';
import { ShoppingCartService } from '@services/shopping-cart.service';
import { HttpHeaders, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { PRODUCT_AMOUNT_REQUIRED_ERROR, PRODUCT_URL } from '@shared/constants/product.constants';
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



  });


