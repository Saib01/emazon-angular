import { FormControl } from '@angular/forms';
import { MaxLengthArrayValidator } from '@utils/max-array-validator';

describe('MaxLengthArrayValidator', () => {
  
  test('should return null if array length is less than or equal to maxLength', () => {
    const control = new FormControl([1, 2, 3]); 
    const validatorFn = MaxLengthArrayValidator.checkMaxLengthArray(3);
    
    const result = validatorFn(control);
    
    expect(result).toBeNull();
  });
  
  test('should return { maxLengthArray: true } if array length is greater than maxLength', () => {
    const control = new FormControl([1, 2, 3, 4]); 
    const validatorFn = MaxLengthArrayValidator.checkMaxLengthArray(3);
    
    const result = validatorFn(control);
    
    expect(result).toEqual({ 'maxLengthArray': true }); // Debe ser inválido
  });

  test('should return null if the array is empty', () => {
    const control = new FormControl([]);
    const validatorFn = MaxLengthArrayValidator.checkMaxLengthArray(3);
    
    const result = validatorFn(control);
    
    expect(result).toBeNull();
  });

  test('should return null if value is undefined', () => {
    const control = new FormControl(undefined); 
    const validatorFn = MaxLengthArrayValidator.checkMaxLengthArray(3);
    
    const result = validatorFn(control);
    
    expect(result).toBeNull();
  });
});