import { AbstractControl } from '@angular/forms';

export class MaxLengthArrayValidator{
    static checkMaxLengthArray(maxLength: number){
    return (control: AbstractControl):{ [key: string]: boolean } | null => {
        const value = (control.value || []).length >maxLength;
        return value ? { 'maxLengthArray': true } : null;
    }
}
}


/*

export class NoWhiteSpaceValidator{
  static checkNoWhitespace(){
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ? { 'whitespace': true } : null;
  }
}
}
*/