import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit, } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorMessages } from '@models/error-messages.model';
import { Status } from '@models/status.model';
import { TransactionService } from '@services/transaction.service';
import { PRODUCT_MIN_AMOUNT, PRODUCT_URL } from '@shared/constants/product.constants';
import { PROPERTY_ID, PROPERTY_NAME } from '@shared/constants/properties.constants';
import { PRODUCT_SUPPLY_GREATER_THAN_ERROR, PRODUCT_SUPPLY_ID_INVALID_ERROR, PRODUCT_SUPPLY_NOT_INTEGER_ERROR, PRODUCT_SUPPLY_REQUIRED_ERROR, PRODUCT_SUPPLY_TITTLE_ERROR, PRODUCT_SUPPLY_TITTLE_SUCCESSFULLY } from '@shared/constants/supply.constants';
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
  status: Status = {
    code: null,
    messages: new Map([[HttpStatusCode.Ok, ''], [HttpStatusCode.NotFound, PRODUCT_SUPPLY_ID_INVALID_ERROR]]),
    tittles: new Map([[true, PRODUCT_SUPPLY_TITTLE_SUCCESSFULLY], [false, PRODUCT_SUPPLY_TITTLE_ERROR]])
  }
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
      { type: min.name, message: PRODUCT_SUPPLY_GREATER_THAN_ERROR },
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
      { type: min.name, message: PRODUCT_SUPPLY_GREATER_THAN_ERROR },
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
    private readonly transactionService: TransactionService
  ) { }
  ngOnInit(): void {
    this.setProduct();
  }

  setProduct() {
    const id = Number(this.route.snapshot.queryParamMap.get(PROPERTY_ID)) || NaN;
    const name = this.route.snapshot.queryParamMap.get(PROPERTY_NAME) ?? '';
    if (isNaN(id)) {
      this.router.navigate([PRODUCT_URL]);
    }
    this.formSupply.controls.id.setValue(id.toString());
    this.formSupply.controls.name.setValue(name);
  }

  validateProduct() {
    if (this.formSupply.valid) {
      const { id, supply } = this.formSupply.getRawValue();
      this.transactionService.addProductSupply({ idProduct: Number(id), amount: Number(supply) }).subscribe({
        next: (response) => this.updateStatusCode(response.status),
        error: (error) => this.updateStatusCode(error.status),
      });
    } else {
      this.formSupply.markAllAsTouched();
    }
  }
  updateStatusCode(status: number) {
    this.status.code = status;
  }
}

