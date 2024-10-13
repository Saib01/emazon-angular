import { AbstractControl} from '@angular/forms';

export class NoWhiteSpaceValidator{
  static checkNoWhitespace(){
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ? { 'whitespace': true } : null;
  }
}
}