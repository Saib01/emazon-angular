import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {

  static readonly WHITESPACE_ERROR = 'whitespace';
  static readonly NOT_INTEGER_ERROR = 'notInteger';
  static readonly MISMATCH_ERROR = 'mismatch';
  static readonly MAX_LENGTH_ARRAY_ERROR = 'maxLengthArray';
  static readonly UNDERAGE_ERROR = 'underage';

  static checkNoWhitespace() {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const isWhitespace = (control.value || '').trim().length === 0;
      return isWhitespace ? { whitespace: true } : null;
    };
  }
  static checkNumberIsInteger() {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const value = control.value;
      const isInteger = value != null && value % 1 !== 0;
      return isInteger ? { notInteger: true } : null;
    };
  }
  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }

  static checkMaxLengthArray(maxLength: number) {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const value = (control.value || []).length > maxLength;
      return value ? { maxLengthArray: true } : null;
    };
  }
  static checkUserAge(minAge: number) {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const birthDate = new Date(control.value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();

      const hasBirthdayPassedThisYear =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() &&
          today.getDate() >= birthDate.getDate());
      const actualAge = hasBirthdayPassedThisYear ? age : age - 1;

      const isUnderage = actualAge < minAge;
      return isUnderage ? { underage: true } : null;
    };
  }
}
