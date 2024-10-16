import { TestBed } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { of } from 'rxjs';
import { StockService } from '@services/stock.service'; 
import { NameValidator } from '@utils/nameValidator';

describe('NameValidator', () => {
  let stockServiceMock: jest.Mocked<StockService>;

  beforeEach(() => {
    stockServiceMock = {
      checkCategoryName: jest.fn(),
      checkBrandName: jest.fn()
    } as unknown as jest.Mocked<StockService>;
  
    TestBed.configureTestingModule({
      providers: [
        { provide: StockService, useValue: stockServiceMock }
      ]
    });
  });

  test('should return null if the category name is available', (done) => {
    stockServiceMock.checkCategoryName.mockReturnValue(of(true));

    const control: AbstractControl = { value: 'existingName' } as AbstractControl;
    const validatorFn = NameValidator.checkNameAvailability(stockServiceMock,'category')(control);

    validatorFn.subscribe((result: any) => {
      expect(result).toBeNull(); 
      done();
    });
  });

  test('should return { notAvailable: true } if the category name is not available', (done) => {
    stockServiceMock.checkCategoryName.mockReturnValue(of(false));

    const control: AbstractControl = { value: 'existingName' } as AbstractControl;
    const validatorFn = NameValidator.checkNameAvailability(stockServiceMock,'category')(control);

    validatorFn.subscribe((result: any) => {
      expect(result).toEqual({ notAvailable: true }); 
      done();
    });
  });

  test('should return null if the brand name is available', (done) => {
    stockServiceMock.checkBrandName.mockReturnValue(of(true));

    const control: AbstractControl = { value: 'existingName' } as AbstractControl;
    const validatorFn = NameValidator.checkNameAvailability(stockServiceMock,'brand')(control);

    validatorFn.subscribe((result: any) => {
      expect(result).toBeNull(); 
      done();
    });
  });


  test('should return { notAvailable: true } if the brand name is not available', (done) => {
    stockServiceMock.checkBrandName.mockReturnValue(of(false));

    const control: AbstractControl = { value: 'existingName' } as AbstractControl;
    const validatorFn = NameValidator.checkNameAvailability(stockServiceMock,'brand')(control);

    validatorFn.subscribe((result: any) => {
      expect(result).toEqual({ notAvailable: true }); 
      done();
    });
  });

});
