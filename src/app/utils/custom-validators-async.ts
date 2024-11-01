import { AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { map, switchMap, timer } from 'rxjs';
import { StockService } from '@services/stock.service';
import { UserService } from '@services/user.service';
import { CATEGORY } from '@shared/constants/category.constants';
import { BRAND } from '@shared/constants/brand.constants';
import { PROPERTY_EMAIL } from '@shared/constants/properties.constants';

@Injectable({
  providedIn: 'root',
})
export class CustomValidatorsAsync {
  static readonly NOT_AVAILABLE_ERROR = 'notAvailable';
  static readonly NOT_AVAILABLE_EMAIL_ERROR = 'notAvailableEmail';
  static readonly NOT_AVAILABLE_ID_DOCUMENT_ERROR = 'notAvailableIdDocument';
  static checkNameAvailability(
    stockService: StockService,
    name: 'category' | 'brand' | 'product'
  ) {
    return (control: AbstractControl) => {
      return timer(1000).pipe(
        switchMap(() => {
          let checkNameMethod;
          if (name === CATEGORY) {
            checkNameMethod = stockService.checkCategoryName.bind(stockService);
          } else if (name === BRAND) {
            checkNameMethod = stockService.checkBrandName.bind(stockService);
          } else {
            checkNameMethod = stockService.checkProductName.bind(stockService);
          }
          return checkNameMethod(control.value).pipe(
            map((response) => (response ? null : { notAvailable: true }))
          );
        })
      );
    };
  }

  static checkUserAvailability(
    userService: UserService,
    type: "email" | "idDocument"
  ) {
    return (control: AbstractControl) => {
      return timer(1000).pipe(
        switchMap(() => {
          if (type === PROPERTY_EMAIL) {
            return userService
              .checkEmail(control.value)
              .pipe(
                map((response) =>
                  response ? null : { notAvailableEmail: true }
                )
              );
          } else {
            return userService
              .checkIdDocument(control.value)
              .pipe(
                map((response) =>
                  response ? null : { notAvailableIdDocument: true }
                )
              );
          }
        })
      );
    };
  }
}
