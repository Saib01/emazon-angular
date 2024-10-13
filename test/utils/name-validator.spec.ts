import { TestBed } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { of } from 'rxjs';
import { StockService } from '@services/stock.service'; 
import { NameValidator } from '@utils/nameValidator';

describe('NameValidator', () => {
  let stockServiceMock: jest.Mocked<StockService>;

  beforeEach(() => {
    stockServiceMock = {
        checkCategoryName: jest.fn()
    } as unknown as jest.Mocked<StockService>;

    TestBed.configureTestingModule({
      providers: [
        { provide: StockService, useValue: stockServiceMock }
      ]
    });
  });

  it('should return null if the category name is available', (done) => {
    stockServiceMock.checkCategoryName.mockReturnValue(of(true));

    const control: AbstractControl = { value: 'existingName' } as AbstractControl;
    const validatorFn = NameValidator.checkNameAvailability(stockServiceMock)(control);

    validatorFn.subscribe((result: any) => {
      expect(result).toBeNull(); 
      done();
    });
  });

  it('should return { notAvailable: true } if the category name is not available', (done) => {
    stockServiceMock.checkCategoryName.mockReturnValue(of(false));

    const control: AbstractControl = { value: 'existingName' } as AbstractControl;
    const validatorFn = NameValidator.checkNameAvailability(stockServiceMock)(control);

    validatorFn.subscribe((result: any) => {
      expect(result).toEqual({ notAvailable: true }); 
      done();
    });
  });
});
