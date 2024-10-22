import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CreateProductComponent } from '../../../../../src/app/components/pages/product/create-product/create-product.component';
import { Router } from '@angular/router';
import { StockService } from '@services/stock.service';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BasicInfo } from '@models/basic-Info.model';
import { Page } from '@models/page.model';
import { of, throwError } from 'rxjs';
import { InputTextComponent } from '../../../../../src/app/components/molecules/input-text/input-text.component';
import { TextAreaComponent } from '../../../../../src/app/components/molecules/text-area/text-area.component';
import { ButtonComponent } from '../../../../../src/app/components/atoms/basic-components/button/button.component';
import { ControlErrorComponent } from '../../../../../src/app/components/molecules/control-error/control-error.component';
import { SimpleSelectComponent } from '../../../../../src/app/components/molecules/simple-select/simple-select.component';
import { MultiSelectComponent } from '../../../../../src/app/components/molecules/multi-select/multi-select.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;
  let stockServiceMock: Partial<StockService>;
  let routerMock: Partial<Router>;

  beforeEach(async () => {
    stockServiceMock = {
      getBrands: jest.fn().mockReturnValue(of({       
        content: [{id:4,name:'A',description:''}],
        totalElements: 1,
        totalPages: 1,
        pageNumber: 0,
        first: true,
        last: true,
        pageSize: 10,
        numberOfElements: 1,
        ascending: false,
        empty: true,} as Page<BasicInfo>)),
      getCategories: jest.fn().mockReturnValue(of({       
        content: [{id:2,name:'A',description:''}],
        totalElements: 1,
        totalPages: 1,
        pageNumber: 0,
        first: true,
        last: true,
        pageSize: 10,
        numberOfElements: 1,
        ascending: false,
        empty: true,} as Page<BasicInfo>)),
      createProduct: jest.fn().mockReturnValue(of({message: 'Category created'})), 
      checkProductName: jest.fn().mockReturnValue(of({notAvailable:true})), 
    };

    routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CreateProductComponent,InputTextComponent,TextAreaComponent,ButtonComponent,ControlErrorComponent,SimpleSelectComponent,MultiSelectComponent],
      providers: [
        { provide: StockService, useValue: stockServiceMock },
        { provide: Router, useValue: routerMock },
        FormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create the form with default values', () => {
    expect(component.formProduct).toBeTruthy();
    expect(component.formProduct.get('name')?.value).toBe('');
    expect(component.formProduct.get('amount')?.value).toBe(0);
    expect(component.formProduct.get('price')?.value).toBe(0);
    expect(component.formProduct.get('brand')?.value).toEqual({ id: 0, name: '', description: '' });
    expect(component.formProduct.get('categoryList')?.value).toEqual([]);
  });

  test('should call getBrands and getCategories on init', () => {
    expect(stockServiceMock.getBrands).toHaveBeenCalled();
    expect(stockServiceMock.getCategories).toHaveBeenCalled();
  });

  test('should set pageBrand and pageCategory on successful getBrands and getCategories', () => {
    const mockBrands: Page<BasicInfo> = { content: [{ id: 1, name: 'Brand1', description: '' }], totalElements: 1, totalPages: 1, pageNumber: 0, first: true, last: true, pageSize: 10, numberOfElements: 1, ascending: false, empty: false };
    const mockCategories: Page<BasicInfo> = { content: [{ id: 1, name: 'Category1', description: '' }], totalElements: 1, totalPages: 1, pageNumber: 0, first: true, last: true, pageSize: 10, numberOfElements: 1, ascending: false, empty: false };

    (stockServiceMock.getBrands as jest.Mock).mockReturnValue(of(mockBrands));
    (stockServiceMock.getCategories as jest.Mock).mockReturnValue(of(mockCategories));
    component.getBrands();
    component.getCategories();

    expect(component.pageBrand).toEqual(mockBrands);
    expect(component.pageCategory).toEqual(mockCategories);
  });

  test('should log error on failed getBrands', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    (stockServiceMock.getBrands as jest.Mock).mockReturnValueOnce(throwError(() => new Error('Communication Error')));
    
    component.getBrands();

    expect(consoleLogSpy).toHaveBeenCalledWith(expect.objectContaining({message: 'Communication Error'}));
    consoleLogSpy.mockRestore();
  });

  test('should log error on failed getCategories', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    (stockServiceMock.getCategories as jest.Mock).mockReturnValueOnce(throwError(() => new Error('Communication Error')));

    component.getCategories();

    expect(consoleLogSpy).toHaveBeenCalledWith(expect.objectContaining({message: 'Communication Error'}));
    consoleLogSpy.mockRestore();
  });

  test('should create product and navigate on valid form submission',fakeAsync( () => {
    component.formProduct.setValue({
      name: 'Product1a',
      description: 'Description1',
      amount: 10,
      price: 100,
      brand: { id: 1, name: 'Brand1', description: 'description' },
      categoryList: [{ id: 1, name: 'Category1', description: 'description' }],
    });
    tick(1000);
    component.validateProduct();
    expect(stockServiceMock.createProduct).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/panel/product']);
  }));

  test('should log error on failed create product',fakeAsync( () => { 
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    (stockServiceMock.createProduct as jest.Mock).mockReturnValueOnce(throwError(() => new Error('Communication Error')));
    component.formProduct.setValue({
      name: 'Product1a',
      description: 'Description1',
      amount: 10,
      price: 100,
      brand: { id: 1, name: 'Brand1', description: 'description' },
      categoryList: [{ id: 1, name: 'Category1', description: 'description' }],
    });
    tick(1000);
    component.validateProduct();
    expect(stockServiceMock.createProduct).toHaveBeenCalled();
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.objectContaining({message: 'Communication Error'}));
    consoleLogSpy.mockRestore();
  }));
  test('should mark form as touched on invalid submission', fakeAsync(() => {
    const markAllAsTouchedSpy = jest.spyOn(component.formProduct, 'markAllAsTouched');
    component.formProduct.controls.name.setValue('ASD');
    component.formProduct.controls.description.setValue('');
    component.formProduct.controls.amount.setValue(5);
    component.formProduct.controls.price.setValue(50);
    component.formProduct.controls.brand.setValue({ id: 0, name: 'name', description: 'description' });
    component.formProduct.controls.categoryList.setValue([{ id: 0, name: 'name', description: 'description' },{ id: 0, name: 'name2', description: 'description2' }]);
    tick(1000);
    component.validateProduct();
    expect(component.formProduct.valid).toBeFalsy();
    expect( markAllAsTouchedSpy).toHaveBeenCalled();
  }));
});
