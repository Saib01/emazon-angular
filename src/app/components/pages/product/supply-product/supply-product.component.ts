import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit, } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorMessages } from '@models/error-messages.model';
import { TransactionService } from '@services/transaction.service';
import { PRODUCT_MIN_AMOUNT, PRODUCT_URL } from '@shared/constants/product.constants';
import { PROPERTY_ID } from '@shared/constants/properties.constants';
import { PRODUCT_SUPPLY_CONNECTION_ERROR, PRODUCT_SUPPLY_GREATER_THAN_ERROR, PRODUCT_SUPPLY_ID_INVALID_ERROR, PRODUCT_SUPPLY_NOT_INTEGER_ERROR, PRODUCT_SUPPLY_REQUIRED_ERROR, PRODUCT_SUPPLY_UNKNOWN_ERROR } from '@shared/constants/supply.constants';
import { CustomValidators } from '@utils/custom-validators';

const {
  checkNumberIsInteger,
  NOT_INTEGER_ERROR,
} = CustomValidators;
const { required, min } = Validators;
@Component({
  selector: 'app-supply-product',
  templateUrl: './supply-product.component.html',
  styleUrls: ['./supply-product.component.scss']
})
export class SupplyProductComponent implements OnInit {
  message:string='';
  status:number|null=null;
  formSupply = this.formBuilder.nonNullable.group({
    id: [{ value: '', disabled: true }, [required, min(PRODUCT_MIN_AMOUNT), checkNumberIsInteger()]],
    name: [{ value: '', disabled: true }, [required]],
    supply: ['', [required, min(PRODUCT_MIN_AMOUNT), checkNumberIsInteger()]]
  });

  errorMessages: { [key: string]: ErrorMessages[] } = {
    id: [
      {
        type: required.name,
        message: PRODUCT_SUPPLY_REQUIRED_ERROR,
      },
      { type: min.name, message: PRODUCT_SUPPLY_GREATER_THAN_ERROR},
      {
        type: NOT_INTEGER_ERROR,
        message: PRODUCT_SUPPLY_NOT_INTEGER_ERROR,
      },
    ],
    supply: [
      {
        type: required.name,
        message: PRODUCT_SUPPLY_REQUIRED_ERROR,
      },
      { type: min.name, message: PRODUCT_SUPPLY_GREATER_THAN_ERROR},
      {
        type: NOT_INTEGER_ERROR,
        message: PRODUCT_SUPPLY_NOT_INTEGER_ERROR,
      },
    ]
  };
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly transactionService:TransactionService
  ) {}
  ngOnInit(): void {
    this.setIdProduct();
  }

  setIdProduct(){
    const id=this.route.snapshot.queryParamMap.get(PROPERTY_ID);
    const parsedId = id ? Number(id) : NaN;
    if(isNaN(parsedId)){
      this.router.navigate([PRODUCT_URL]);
    }
    this.formSupply.controls.id.setValue(parsedId.toString());
  }

  validateProduct() {
    if (this.formSupply.valid) {
      const {id,supply}=this.formSupply.getRawValue();
      this.transactionService.addProductSupply({idProduct:Number(id),amount:Number(supply)}).subscribe({
        next: (rta) => {
          this.router.navigate([PRODUCT_URL]);
        },
        error: (error) => {
          this.message=this.getMessageError(error.status);
          this.status=error.status;
          console.log(this.status);

        },
      });
    } else {
      this.formSupply.markAllAsTouched();
    }
  }
  handleError() {
    if(this.status==HttpStatusCode.NotFound){
      this.router.navigate([PRODUCT_URL]);
    }
    this.status=null;
  }
  getMessageError(statusError:number){
    switch (statusError) {
      case 0:
          return PRODUCT_SUPPLY_CONNECTION_ERROR;
      case 404:
          return PRODUCT_SUPPLY_ID_INVALID_ERROR;
      default:
          return PRODUCT_SUPPLY_UNKNOWN_ERROR;
  }
  }
}