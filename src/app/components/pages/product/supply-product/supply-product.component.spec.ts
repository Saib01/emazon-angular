/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyProductComponent } from './supply-product.component';
import { HttpStatusCode } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TransactionService } from '@services/transaction.service';
import { PRODUCT_URL } from '@shared/constants/product.constants';
import { of, throwError } from 'rxjs';
import { PRODUCT_SUPPLY_CONNECTION_ERROR, PRODUCT_SUPPLY_ID_INVALID_ERROR, PRODUCT_SUPPLY_UNKNOWN_ERROR } from '@shared/constants/supply.constants';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PROPERTY_ID, PROPERTY_NAME } from '@shared/constants/properties.constants';

describe('SupplyProductComponent', () => {
  let component: SupplyProductComponent;
  let fixture: ComponentFixture<SupplyProductComponent>;
  let transactionService: jest.Mocked<TransactionService>;
  let router: jest.Mocked<Router>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(() => {
    const transactionServiceMock = {
      addProductSupply: jest.fn()
    };
    const routerMock = {
      navigate: jest.fn()
    };
    mockActivatedRoute = {
      snapshot: {
        queryParamMap: {
          get: jest.fn((param: string) => {
            switch (param) {
              case PROPERTY_ID:
                return '123'; 
              case PROPERTY_NAME:
                return 'Test Product';
              default:
                return null;
            }
          }),
        } as unknown as ParamMap
      } as ActivatedRoute['snapshot']
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SupplyProductComponent],
      providers: [
        { provide: TransactionService, useValue: transactionServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SupplyProductComponent);
    component = fixture.componentInstance;
    transactionService = TestBed.inject(TransactionService) as jest.Mocked<TransactionService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  test('should set product id from route', () => {
    component.ngOnInit();
    expect(component.formSupply.controls.id.value).toBe('123');
  });

  test('should call addProductSupply when form is valid', () => {
    component.formSupply.setValue({ id: '1', name: 'Product', supply: '10' });
    (transactionService.addProductSupply as jest.Mock).mockReturnValueOnce(
      of({})
    );
    component.validateProduct();

    expect(transactionService.addProductSupply).toHaveBeenCalledWith({ idProduct: 1, amount: 10 });
    expect(router.navigate).toHaveBeenCalledWith([PRODUCT_URL]);
  });

  test('should set error message when addProductSupply fails', () => {
    component.formSupply.setValue({ id: '1', name: 'Product', supply: '10' });

    const errorResponse = { status: HttpStatusCode.NotFound };
    transactionService.addProductSupply.mockReturnValue(throwError(() => errorResponse));

    component.validateProduct();

    expect(component.message).toBe(PRODUCT_SUPPLY_ID_INVALID_ERROR);
    expect(component.status).toBe(HttpStatusCode.NotFound);
  });

  test('should navigate to product URL if status is 404 in handleError', () => {
    component.status = HttpStatusCode.NotFound;
    component.handleError();
    expect(router.navigate).toHaveBeenCalledWith([PRODUCT_URL]);
    expect(component.status).toBeNull();
  });
  test('should return correct message error for status codes', () => {
    expect(component.getMessageError(0)).toBe(PRODUCT_SUPPLY_CONNECTION_ERROR);
    expect(component.getMessageError(404)).toBe(PRODUCT_SUPPLY_ID_INVALID_ERROR);
    expect(component.getMessageError(500)).toBe(PRODUCT_SUPPLY_UNKNOWN_ERROR);
  });

  test('should navigate to PRODUCT_URL if id parameter is invalid', () => {
    (mockActivatedRoute.snapshot!.queryParamMap.get as jest.Mock).mockReturnValue('invalidId'); 
    component.setProduct();
    
    expect(router.navigate).toHaveBeenCalledWith([PRODUCT_URL]);
  });
  test('should navigate to PRODUCT_URL if id parameter is empty', () => {
    (mockActivatedRoute.snapshot!.queryParamMap.get as jest.Mock).mockReturnValue(''); 
    component.setProduct();
    
    expect(router.navigate).toHaveBeenCalledWith([PRODUCT_URL]);
  });
  test('should mark all fields as touched when the form is invalid', () => {
    component.validateProduct();
    expect(component.formSupply.touched).toBeTruthy();
  });
});
