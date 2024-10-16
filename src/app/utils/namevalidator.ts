import { AbstractControl} from '@angular/forms';
import { Injectable } from '@angular/core';
import { map, switchMap, timer } from 'rxjs';
import { StockService } from '@services/stock.service';


@Injectable({
  providedIn: 'root'
})
export class NameValidator {

  static checkNameAvailability(stockService: StockService, name: 'category' | 'brand') {
    return (control: AbstractControl) => {
      return timer(1000).pipe(
        switchMap(() => {
          const checkNameMethod = name === 'category'
            ? stockService.checkCategoryName.bind(stockService)
            : stockService.checkBrandName.bind(stockService);
  
          return checkNameMethod(control.value).pipe(
            map(response => response ? null : { notAvailable: true })
          );
        })
      );
    };
  }
}