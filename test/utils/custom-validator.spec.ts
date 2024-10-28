import { FormControl } from '@angular/forms';
import { CustomValidators } from '@utils/custom-validators';

describe('CustomValidators', () => {
  let checkMaxLength = CustomValidators.checkMaxLengthArray(3);
  let checkUserAge=CustomValidators.checkUserAge(18);
  let checkNumberInteger=CustomValidators.checkNumberIsInteger();

  test('should return null if array length is less than or equal to maxLength', () => {
    const control = new FormControl([1, 2, 3]); 
    validateField(control);
  });
  
  test('should return { maxLengthArray: true } if array length is greater than maxLength', () => {
    const control = new FormControl([1, 2, 3, 4]); 
    
    const result = checkMaxLength(control);
    
    expect(result).toEqual({ 'maxLengthArray': true }); 
  });

  test('should return null if the array is empty', () => {
    const control = new FormControl([]);
    
    validateField(control);
  });

  test('should return null if value is undefined', () => {
    const control = new FormControl(undefined); 
    
    validateField(control);

  });
  function validateField(control:FormControl) {
    const result = checkMaxLength(control);

    expect(result).toBeNull();
  }

  test('should return null If the age is of an adult', () => {
    const control = new FormControl('1987-10-15'); 
    
    const result = checkUserAge(control);

    expect(result).toBeNull();
  });
  test('should return { isUnderage: true } if the age is that of a minor', () => {
    const control = new FormControl('2023-10-15'); 
    
    const result = checkUserAge(control);

    expect(result).toEqual({ 'underage': true }); 
  });
  test('should return null If the number is an integer', () => {
    const control = new FormControl(18); 
    const result = checkNumberInteger(control);

    expect(result).toBeNull();
  });
  test('should return { notInteger: true } If the number is not an integer', () => {
    const control = new FormControl(18.5); 
    
    const result = checkNumberInteger(control);

    expect(result).toEqual({ 'notInteger': true }); 
  });
});