import { TestBed } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { of } from 'rxjs';
import { StockService } from '@services/stock.service'; 
import { CustomValidatorsAsync } from '@utils/custom-validators-async';
import { UserService } from '@services/user.service';

describe('CustomValidatorsAsync', () => {
  let stockServiceMock: jest.Mocked<StockService>;
  let userServiceMock: jest.Mocked<UserService>;

  beforeEach(() => {
    stockServiceMock = {
      checkCategoryName: jest.fn(),
      checkBrandName: jest.fn(),
      checkProductName: jest.fn()
    } as unknown as jest.Mocked<StockService>;
    userServiceMock = {
      checkIdDocument: jest.fn(),
      checkEmail: jest.fn()
    } as unknown as jest.Mocked<UserService>;
    TestBed.configureTestingModule({
      providers: [
        { provide: StockService, useValue: stockServiceMock }
      ]
    });
  });

  test('should return null if the category name is available', (done) => {
    stockServiceMock.checkCategoryName.mockReturnValue(of(true));

    const control: AbstractControl = { value: 'existingName' } as AbstractControl;
    const validatorFn = CustomValidatorsAsync.checkNameAvailability(stockServiceMock,'category')(control);

    validatorFn.subscribe((result: any) => {
      expect(result).toBeNull(); 
      done();
    });
  });

  test('should return { notAvailable: true } if the category name is not available', (done) => {
    stockServiceMock.checkCategoryName.mockReturnValue(of(false));

    const control: AbstractControl = { value: 'existingName' } as AbstractControl;
    const validatorFn = CustomValidatorsAsync.checkNameAvailability(stockServiceMock,'category')(control);

    validatorFn.subscribe((result: any) => {
      expect(result).toEqual({ notAvailable: true }); 
      done();
    });
  });

  test('should return null if the brand name is available', (done) => {
    stockServiceMock.checkBrandName.mockReturnValue(of(true));

    const control: AbstractControl = { value: 'existingName' } as AbstractControl;
    const validatorFn = CustomValidatorsAsync.checkNameAvailability(stockServiceMock,'brand')(control);

    validatorFn.subscribe((result: any) => {
      expect(result).toBeNull(); 
      done();
    });
  });


  test('should return { notAvailable: true } if the brand name is not available', (done) => {
    stockServiceMock.checkBrandName.mockReturnValue(of(false));

    const control: AbstractControl = { value: 'existingName' } as AbstractControl;
    const validatorFn = CustomValidatorsAsync.checkNameAvailability(stockServiceMock,'brand')(control);

    validatorFn.subscribe((result: any) => {
      expect(result).toEqual({ notAvailable: true }); 
      done();
    });
  });

  test('should return null if the product name is available', (done) => {
    stockServiceMock.checkProductName.mockReturnValue(of(true));

    const control: AbstractControl = { value: 'existingName' } as AbstractControl;
    const validatorFn =CustomValidatorsAsync.checkNameAvailability(stockServiceMock,'product')(control);

    validatorFn.subscribe((result: any) => {
      expect(result).toBeNull(); 
      done();
    });
  });


  test('should return { notAvailable: true } if the product name is not available', (done) => {
    stockServiceMock.checkProductName.mockReturnValue(of(false));

    const control: AbstractControl = { value: 'existingName' } as AbstractControl;
    const validatorFn = CustomValidatorsAsync.checkNameAvailability(stockServiceMock,'product')(control);

    validatorFn.subscribe((result: any) => {
      expect(result).toEqual({ notAvailable: true }); 
      done();
    });
  });


  test('should return null if the user email is available', (done) => {
    userServiceMock.checkEmail.mockReturnValue(of(true));

    const control: AbstractControl = { value: 'existingEmail' } as AbstractControl;
    const validatorFn = CustomValidatorsAsync.checkUserAvailability(userServiceMock,'email')(control);

    validatorFn.subscribe((result: any) => {
      expect(result).toBeNull(); 
      done();
    });
  });

  test('should return { notAvailable: true } if the user email is not available', (done) => {
    userServiceMock.checkEmail.mockReturnValue(of(false));

    const control: AbstractControl = { value: 'existingEmail' } as AbstractControl;
    const validatorFn = CustomValidatorsAsync.checkUserAvailability(userServiceMock,'email')(control);

    validatorFn.subscribe((result: any) => {
      expect(result).toEqual({ notAvailableEmail: true }); 
      done();
    });
  });

  test('should return null if the user id document is available', (done) => {
    userServiceMock.checkIdDocument.mockReturnValue(of(true));

    const control: AbstractControl = { value: 'existingEmail' } as AbstractControl;
    const validatorFn = CustomValidatorsAsync.checkUserAvailability(userServiceMock,'idDocument')(control);

    validatorFn.subscribe((result: any) => {
      expect(result).toBeNull(); 
      done();
    });
  });

  test('should return { notAvailable: true } if the user id document is not available', (done) => {
    userServiceMock.checkIdDocument.mockReturnValue(of(false));

    const control: AbstractControl = { value: 'existingEmail' } as AbstractControl;
    const validatorFn = CustomValidatorsAsync.checkUserAvailability(userServiceMock,'idDocument')(control);

    validatorFn.subscribe((result: any) => {
      expect(result).toEqual({ notAvailableIdDocument: true }); 
      done();
    });
  });
});
