import { AbstractControl, ValidationErrors, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { Injectable } from '@angular/core';
import { debounceTime, map, catchError, of, Observable, switchMap, distinctUntilChanged, timer } from 'rxjs';
import { StockService } from '@services/Stock.service';


@Injectable({
  providedIn: 'root'
})
export class NameValidator {

  static checkNameAvailability(stockService:StockService){
    return(control:AbstractControl)=>{
      return timer(1000).pipe(
        switchMap(()=>
          stockService.checkName(control.value).pipe(
            map(response=>{
              return response.valueOf()?null:{notAvailable:true};
            })
          )
        )
      )
    };

  }
}