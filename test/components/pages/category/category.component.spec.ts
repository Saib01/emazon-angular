import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { StockService } from '@services/stock.service';
import { ButtonComponent } from '../../../../src/app/components/atoms/basic-components/button/button.component';
import { ControlErrorComponent } from '../../../../src/app/components/molecules/control-error/control-error.component';
import { InputTextComponent } from '../../../../src/app/components/molecules/input-text/input-text.component';
import { TextAreaComponent } from '../../../../src/app/components/molecules/text-area/text-area.component';
import { CategoryComponent } from '../../../../src/app/components/pages/category/category.component';
import { Category } from '@models/category.model';
import { ResponseMessage } from '@models/response.model';
import { NameValidator } from '@utils/nameValidator';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';



class MockStockService{
  private readonly API_STOCK = 'http://mockapi.com/api/category/'; 
  createCategory(category: Category) {
    
    console.log("h1");
    const response: ResponseMessage = {
        message: "Category created"
    };
    return of(response); 
}
  checkCategoryName(name: string) {
    return of(true);
  }
}



class MockNameValidator{
  static checkNameAvailability(stockService:StockService){
    return of(null);
  }
}

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let stockServiceMock: MockStockService;
  let mockNameValidator: MockNameValidator;
  let router: Router;

  beforeEach(async () => {
    stockServiceMock = new MockStockService();
    mockNameValidator=new MockNameValidator();

    await TestBed.configureTestingModule({
      declarations: [
        CategoryComponent,
        InputTextComponent,
        TextAreaComponent,
        ButtonComponent,
        ControlErrorComponent,
      ],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: StockService, useValue: stockServiceMock },
        {provide:NameValidator, useValue:mockNameValidator},
        {provide:Router,useValue:{navigate:jest.fn()}}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('CategoryComponent', () => {
    it('should mark form as touched when submitting an invalid form', () => {
      component.formCategory.controls['name'].setValue('');
      component.validateCategory();
      expect(component.formCategory.valid).toBe(false);
      expect(component.formCategory.touched).toBe(true);
    });
  
    it('should call stock.create and navigate when form is valid', fakeAsync(() => {
      const spy = jest.spyOn(stockServiceMock, 'createCategory').mockReturnValue(of({
        message: "Category created"
      }));
      component.formCategory.controls['name'].setValue('Category 1');
      component.formCategory.controls['description'].setValue('Category description');
      component.formCategory.controls['name'].setErrors({ notAvailable: false });
      component.formCategory.markAllAsTouched();
      tick(1000);
      component.validateCategory();
      expect(spy).toHaveBeenCalled();
      expect(component.formCategory.pristine).toBeTruthy();
      expect(component.formCategory.touched).toBeTruthy();
      expect(router.navigate).toHaveBeenCalledWith(['panel/home']);
    }));

    it('should throw an error when an issue arises with the communication', fakeAsync(() => {
      const spy = jest.spyOn(stockServiceMock, 'createCategory').mockReturnValueOnce(
        throwError(() => new Error('Communication Error'))
      );
      component.formCategory.controls['name'].setValue('Category 1');
      component.formCategory.controls['description'].setValue('Category description');
      component.formCategory.controls['name'].setErrors({ notAvailable: false });
      component.formCategory.markAllAsTouched();
      tick(1000);
      component.validateCategory();
      expect(spy).toHaveBeenCalled();
      expect(component.formCategory.pristine).toBeTruthy();
      expect(component.formCategory.touched).toBeTruthy();
      expect(router.navigate).not.toHaveBeenCalledWith(['panel/home']);
    }));
  });
});