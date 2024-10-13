import { AbstractControl} from '@angular/forms';
import { Injectable } from '@angular/core';
import { map, switchMap, timer } from 'rxjs';
import { StockService } from '@services/stock.service';


@Injectable({
  providedIn: 'root'
})
export class NameValidator {

  static checkNameAvailability(stockService:StockService){
    return(control:AbstractControl)=>{
      return timer(1000).pipe(
        switchMap(()=>
          stockService.checkCategoryName(control.value).pipe(
            map(response=>response.valueOf() ? null : { notAvailable: true })
          )
        )
      )
    };

  }
}