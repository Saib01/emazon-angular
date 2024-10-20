import { AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { map, switchMap, timer } from 'rxjs';
import { StockService } from '@services/stock.service';


@Injectable({
  providedIn: 'root'
})
export class NameValidator {

  static checkNameAvailability(stockService: StockService, name: 'category' | 'brand' | 'product') {
    return (control: AbstractControl) => {
      return timer(1000).pipe(
        switchMap(() => {
          let checkNameMethod;
          if (name === 'category') {
              checkNameMethod = stockService.checkCategoryName.bind(stockService);
          } else if (name === 'brand') {
              checkNameMethod = stockService.checkBrandName.bind(stockService);
          } else {
              checkNameMethod = stockService.checkProductName.bind(stockService);
          }
          return checkNameMethod(control.value).pipe(
            map(response => response ? null : { notAvailable: true })
          );
        })
      );
    };
  }
}