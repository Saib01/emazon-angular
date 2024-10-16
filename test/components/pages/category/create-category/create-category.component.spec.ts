import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { StockService } from '@services/stock.service';
import { ButtonComponent } from '../../../../../src/app/components/atoms/basic-components/button/button.component';
import { ControlErrorComponent } from '../../../../../src/app/components/molecules/control-error/control-error.component';
import { InputTextComponent } from '../../../../../src/app/components/molecules/input-text/input-text.component';
import { TextAreaComponent } from '../../../../../src/app/components/molecules/text-area/text-area.component';
import { CreateCategoryComponent } from '../../../../../src/app/components/pages/category/create-category/create-category.component';
import { BasicInfo } from '@models/BasicInfo.model';
import { ResponseMessage } from '@models/response.model';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { BasicFormComponent } from '../../../../../src/app/components/organisms/basic-form/basic-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

class MockStockService {
  private readonly API_STOCK = 'http://mockapi.com/api/category/';
  createCategory(category: BasicInfo) {
    const response: ResponseMessage = {
      message: 'Category created',
    };
    return of(response);
  }
  checkCategoryName(name: string) {
    return of(true);
  }
}
describe('CategoryComponent', () => {
  let component: CreateCategoryComponent;
  let fixture: ComponentFixture<CreateCategoryComponent>;
  let stockServiceMock: MockStockService;
  let router: Router;

  beforeEach(async () => {
    stockServiceMock = new MockStockService();
    await TestBed.configureTestingModule({
      declarations: [
        CreateCategoryComponent,
        InputTextComponent,
        TextAreaComponent,
        ButtonComponent,
        ControlErrorComponent,
        BasicFormComponent,
      ],
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: StockService, useValue: stockServiceMock },
        { provide: Router, useValue: { navigate: jest.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCategoryComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    component.formCategory.markAllAsTouched();
    fixture.detectChanges();
  });
  afterEach(() => {
    expect(component.formCategory.pristine).toBeTruthy();
    expect(component.formCategory.touched).toBeTruthy();
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  test('should mark form as touched when submitting an invalid form when name is empty', () => {
    setFormValues('', 'description');
    expect(component.formCategory.valid).toBe(false);
  });

  test('should mark form as touched when submitting an invalid form when description is empty', () => {
    setFormValues('Category 1', '');
    expect(component.formCategory.valid).toBe(false);
  });
  test('should mark form as touched when submitting an invalid form when category name exist', fakeAsync(() => {
    const spy = jest
      .spyOn(stockServiceMock, 'checkCategoryName')
      .mockReturnValueOnce(of(false));
    setFormValues('Category 1', 'Category description');
    tick(1000);
    expect(spy).toHaveBeenCalled();
    expect(component.formCategory.valid).toBe(false);
  }));

  test('should call stock.create and navigate when form is valid', fakeAsync(() => {
    const spy = jest.spyOn(stockServiceMock, 'createCategory').mockReturnValue(
      of({
        message: 'Category created',
      })
    );
    setFormValues('Category 1', 'Category description');
    tick(1000);
    component.validateCategory();
    expect(spy).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/panel/category']);
  }));

  test('should throw an error when an issue arises with the communication', fakeAsync(() => {
    const spy = jest
      .spyOn(stockServiceMock, 'createCategory')
      .mockReturnValueOnce(throwError(() => new Error('Communication Error')));
    setFormValues('Category 1', 'Category description');
    tick(1000);
    component.validateCategory();
    expect(spy).toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalledWith(['/panel/category']);
  }));

  test('should be invalid if the name size is invalid', fakeAsync(() => {
    const spy = jest.spyOn(stockServiceMock, 'createCategory').mockReturnValue(
      of({
        message: 'Category created',
      })
    );
    setFormValues(
      'Category 1Category 1Category 1Category 1Category 1Category 1Category 1Category 1Category 1Category 1Category 1Category 1Category 1Category 1Category 1Category 1',
      'Category description'
    );
    shouldBeInvalid(spy);
  }));

  test('should be invalid if the description size is invalid', fakeAsync(() => {
    const spy = jest.spyOn(stockServiceMock, 'createCategory').mockReturnValue(
      of({
        message: 'Category created',
      })
    );
    setFormValues(
      'Category 1',
      'Category descriptionCategory descriptionCategory descriptionCategory descriptionCategory descriptionCategory descriptionCategory descriptionCategory descriptionCategory descriptionCategory descriptionCategory descriptionCategory descriptionCategory descriptionCategory descriptionCategory descriptionCategory descriptionCategory descriptionCategory descriptionCategory descriptionCategory descriptionCategory descriptionCategory descriptionCategory descriptionCategory descriptionCategory descriptionCategory descriptionCategory descriptionCategory descriptionCategory descriptionCategory descriptionCategory descriptionCategory descriptionCategory description'
    );
    shouldBeInvalid(spy);
  }));

  const setFormValues = (name: string, description: string) => {
    component.formCategory.controls['name'].setValue(name);
    component.formCategory.controls['description'].setValue(description);
    fixture.detectChanges();
  };
  const shouldBeInvalid = (
    spy: jest.SpyInstance<Observable<ResponseMessage>>
  ) => {
    tick(1000);
    component.validateCategory();
    expect(spy).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalledWith(['/panel/category']);
  };
});
