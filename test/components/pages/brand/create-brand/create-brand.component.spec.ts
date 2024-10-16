import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {ReactiveFormsModule } from '@angular/forms';

import { StockService } from '@services/stock.service';
import { ButtonComponent } from '../../../../../src/app/components/atoms/basic-components/button/button.component';
import { ControlErrorComponent } from '../../../../../src/app/components/molecules/control-error/control-error.component';
import { InputTextComponent } from '../../../../../src/app/components/molecules/input-text/input-text.component';
import { TextAreaComponent } from '../../../../../src/app/components/molecules/text-area/text-area.component';
import { BasicInfo } from '@models/BasicInfo.model';
import { ResponseMessage } from '@models/response.model';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { BasicFormComponent } from '../../../../../src/app/components/organisms/basic-form/basic-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CreateBrandComponent } from '../../../../../src/app/components/pages/brand/create-brand/create-brand.component';

class MockStockService{
  private readonly API_STOCK = 'http://mockapi.com/api/brand/'; 
  createBrand(brand: BasicInfo) {
    const response: ResponseMessage = {
        message: "Brand created"
    };
    return of(response); 
}
  checkBrandName(brand: string) {
    return of(true);
  }
}
describe('CreateBrandComponent', () => {
  let component: CreateBrandComponent;
  let fixture: ComponentFixture<CreateBrandComponent>;
  let stockServiceMock: MockStockService;
  let router: Router;

  beforeEach(async () => {
    stockServiceMock = new MockStockService();
    await TestBed.configureTestingModule({
      declarations: [
        CreateBrandComponent,
        InputTextComponent,
        TextAreaComponent,
        ButtonComponent,
        ControlErrorComponent,
        BasicFormComponent
      ],
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: StockService, useValue: stockServiceMock },
        {provide:Router,useValue:{navigate:jest.fn()}}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateBrandComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    component.formBrand.markAllAsTouched();
    fixture.detectChanges();
  });
  afterEach(() => {
    expect(component.formBrand.pristine).toBeTruthy();
    expect(component.formBrand.touched).toBeTruthy();
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  test('should mark form as touched when submitting an invalid form when name is empty', () => {
    setFormValues('', 'description');
    expect(component.formBrand.valid).toBe(false);
  });

  test('should mark form as touched when submitting an invalid form when description is empty', () => {
    setFormValues('Brand 1', '');
    expect(component.formBrand.valid).toBe(false);
  });
  test('should mark form as touched when submitting an invalid form when brand name exist', fakeAsync(() => {
    const spy = jest
      .spyOn(stockServiceMock, 'checkBrandName')
      .mockReturnValueOnce(of(false));
    setFormValues('Brand 1', 'Brand description');
    tick(1000);
    expect(spy).toHaveBeenCalled();
    expect(component.formBrand.valid).toBe(false);
  }));

  test('should call stock.create and navigate when form is valid', fakeAsync(() => {
    const spy = jest.spyOn(stockServiceMock, 'createBrand').mockReturnValue(
      of({
        message: 'Brand created',
      })
    );
    setFormValues('Brand 1', 'Brand description');
    tick(1000);
    component.validateBrand();
    expect(spy).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/panel/brand']);
  }));

  test('should throw an error when an issue arises with the communication', fakeAsync(() => {
    const spy = jest
      .spyOn(stockServiceMock, 'createBrand')
      .mockReturnValueOnce(throwError(() => new Error('Communication Error')));
    setFormValues('Brand 1', 'Brand description');
    tick(1000);
    component.validateBrand();
    expect(spy).toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalledWith(['/panel/brand']);
  }));

  test('should be invalid if the name size is invalid', fakeAsync(() => {
    const spy = jest.spyOn(stockServiceMock, 'createBrand').mockReturnValue(
      of({
        message: 'Brand created',
      })
    );
    setFormValues(
      'Brand 1Brand 1Brand 1Brand 1Brand 1Brand 1Brand 1Brand 1Brand 1Brand 1Brand 1Brand 1Brand 1Brand 1Brand 1Brand 1',
      'Brand description'
    );
    shouldBeInvalid(spy);
  }));

  test('should be invalid if the description size is invalid', fakeAsync(() => {
    const spy = jest.spyOn(stockServiceMock, 'createBrand').mockReturnValue(
      of({
        message: 'Brand created',
      })
    );
    setFormValues(
      'Brand 1',
      'Brand descriptionBrand descriptionBrand descriptionBrand descriptionBrand descriptionBrand descriptionBrand descriptionBrand descriptionBrand descriptionBrand descriptionBrand descriptionBrand descriptionBrand descriptionBrand descriptionBrand descriptionBrand descriptionBrand descriptionBrand descriptionBrand descriptionBrand descriptionBrand descriptionBrand descriptionBrand descriptionBrand descriptionBrand descriptionBrand descriptionBrand descriptionBrand descriptionBrand descriptionBrand descriptionBrand descriptionBrand descriptionBrand description'
    );
    shouldBeInvalid(spy);
  }));

  const setFormValues = (name: string, description: string) => {
    component.formBrand.controls['name'].setValue(name);
    component.formBrand.controls['description'].setValue(description);
    fixture.detectChanges();
  };
  const shouldBeInvalid = (
    spy: jest.SpyInstance<Observable<ResponseMessage>>
  ) => {
    tick(1000);
    component.validateBrand();
    expect(spy).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalledWith(['/panel/brand']);
  };
});
