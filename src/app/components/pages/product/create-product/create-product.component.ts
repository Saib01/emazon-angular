import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BasicInfo } from '@models/basic-Info.model';
import { ErrorMessages } from '@models/error-messages.model';
import { Page } from '@models/page.model';
import { ProductRequest } from '@models/product.model';
import { Status } from '@models/status.model';
import { StockService } from '@services/stock.service';
import { PRODUCT_AMOUNT_GREATER_THAN_ERROR, PRODUCT_AMOUNT_NOT_INTEGER_ERROR, PRODUCT_AMOUNT_REQUIRED_ERROR, PRODUCT_BRAND_REQUIRED_ERROR, PRODUCT_CATEGORY_LIST_MAX_LENGTH_ERROR, PRODUCT_CATEGORY_LIST_REQUIRED_ERROR, PRODUCT_DESCRIPTION_EMPTY_OR_NULL_ERROR, PRODUCT_MIN_AMOUNT, PRODUCT_MIN_PRICE, PRODUCT_NAME_EMPTY_OR_NULL_ERROR, PRODUCT_NAME_NOT_AVAILABLE_ERROR, PRODUCT_PRICE_GREATER_THAN_ERROR, PRODUCT_PRICE_REQUIRED_ERROR, PRODUCT_TITTLE_ERROR, PRODUCT_TITTLE_SUCCESSFULLY, PRODUCT_URL } from '@shared/constants/product.constants';
import { CustomValidators } from '@utils/custom-validators';
import { CustomValidatorsAsync } from '@utils/custom-validators-async';
const {
  checkNoWhitespace,
  checkNumberIsInteger,
  checkMaxLengthArray,
  WHITESPACE_ERROR,
  NOT_INTEGER_ERROR,
  MAX_LENGTH_ARRAY_ERROR,
} = CustomValidators;
const { checkNameAvailability, NOT_AVAILABLE_ERROR } = CustomValidatorsAsync;
const { required, min } = Validators;
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent {
  status: Status = {
    code: null,
    messages: new Map([[HttpStatusCode.Created, '']]),
    tittles: new Map([[true, PRODUCT_TITTLE_SUCCESSFULLY],[false, PRODUCT_TITTLE_ERROR]])
  } 
  formProduct = this.formBuilder.nonNullable.group({
    name: [
      '',
      [checkNoWhitespace()],
      checkNameAvailability(this.stock, 'product'),
    ],
    description: ['', [checkNoWhitespace()]],
    amount: ['', [required, min(PRODUCT_MIN_AMOUNT), checkNumberIsInteger()]],
    price: ['', [required, min(PRODUCT_MIN_PRICE)]],
    brand: [
      {
        id: 0,
        name: '',
        description: '',
      } as BasicInfo,
      [required],
    ],
    categoryList: [[] as Array<BasicInfo>, [required, checkMaxLengthArray(3)]],
  });

  errorMessages: { [key: string]: ErrorMessages[] } = {
    name: [
      {
        type: WHITESPACE_ERROR,
        message: PRODUCT_NAME_EMPTY_OR_NULL_ERROR,
      },
      {
        type: NOT_AVAILABLE_ERROR,
        message: PRODUCT_NAME_NOT_AVAILABLE_ERROR,
      },
    ],
    description: [
      {
        type: WHITESPACE_ERROR,
        message: PRODUCT_DESCRIPTION_EMPTY_OR_NULL_ERROR,
      },
    ],
    amount: [
      {
        type: required.name,
        message: PRODUCT_AMOUNT_REQUIRED_ERROR,
      },
      { type: min.name, message: PRODUCT_AMOUNT_GREATER_THAN_ERROR},
      {
        type: NOT_INTEGER_ERROR,
        message: PRODUCT_AMOUNT_NOT_INTEGER_ERROR,
      },
    ],
    price: [
      { type: required.name, message: PRODUCT_PRICE_REQUIRED_ERROR },
      { type: min.name, message: PRODUCT_PRICE_GREATER_THAN_ERROR },
    ],
    brand: [{ type: required.name, message: PRODUCT_BRAND_REQUIRED_ERROR }],
    categoryList: [
      { type: required.name, message: PRODUCT_CATEGORY_LIST_REQUIRED_ERROR },
      {
        type: MAX_LENGTH_ARRAY_ERROR,
        message: PRODUCT_CATEGORY_LIST_MAX_LENGTH_ERROR,
      },
    ],
  };
  pageBrand: Page<BasicInfo> = this.emptyPageBasicInfo();
  pageCategory: Page<BasicInfo> = this.emptyPageBasicInfo();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly stock: StockService
  ) {
    this.getBrands();
    this.getCategories();
  }

  getBrands() {
    this.stock.getBrands('ASC', 0, 100).subscribe({
      next: (rta: Page<BasicInfo>) => {
        this.pageBrand = rta;
      }
    });
  }
  getCategories() {
    this.stock.getCategories('ASC', 0, 100).subscribe({
      next: (rta: Page<BasicInfo>) => {
        this.pageCategory = rta;
      }
    });
  }
  validateProduct() {
    if (this.formProduct.valid) {
      const product: ProductRequest = {
        name: this.formProduct.getRawValue().name,
        description: this.formProduct.getRawValue().description,
        amount: Number(this.formProduct.getRawValue().amount),
        price: Number(this.formProduct.getRawValue().price),
        brandId: Number(this.formProduct.getRawValue().brand.id),
        categoryIdsList: this.formProduct
          .getRawValue()
          .categoryList.map((num) => Number(num.id)),
      };
      this.stock.createProduct(product).subscribe({
        next: (response) => this.updateStatusCode(response.status),
        error: (error) => this.updateStatusCode(error.status),
      });
    } else {
      this.formProduct.markAllAsTouched();
    }
  }
  updateStatusCode(status: number) {
    this.status.code = status;
  }
  emptyPageBasicInfo(): Page<BasicInfo> {
    return {
      content: [],
      totalElements: 0,
      totalPages: 0,
      pageNumber: 0,
      first: true,
      last: true,
      pageSize: 10,
      numberOfElements: 0,
      ascending: false,
      empty: true,
    };
  }
}
