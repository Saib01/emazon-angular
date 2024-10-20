import { Component} from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BasicInfo } from '@models/basic-Info.model';
import { ErrorMessages } from '@models/error-messages.model';
import { Page } from '@models/page.model';
import { ProductRequest } from '@models/product.model';
import { StockService } from '@services/stock.service';
import { MaxLengthArrayValidator } from '@utils/max-array-validator';
import { NameValidator } from '@utils/nameValidator';
import { NoWhiteSpaceValidator } from '@utils/noWhitespaceValidator';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent {

  
  formProduct = this.formBuilder.nonNullable.group({
    name: [
      '',
      [NoWhiteSpaceValidator.checkNoWhitespace()],
      NameValidator.checkNameAvailability(this.stock, 'product'),
    ],
    description: ['', [NoWhiteSpaceValidator.checkNoWhitespace()]],
    amount: [null, [Validators.required, Validators.min(1)]],
    price: [null , [Validators.required, Validators.min(1)]],
    brand: [{
      id:0,
      name:'',
      description:''
    } as BasicInfo, [Validators.required]],
    categoryList: [
      [] as  Array<BasicInfo>,
      [Validators.required, MaxLengthArrayValidator.checkMaxLengthArray(3)],
    ],
  });

  errorMessages: { [key: string]: ErrorMessages[] } = {
    name: [
      {type: 'whitespace', message: 'The product name cannot be empty or null.'},
      {type: 'notAvailable', message: 'There is already a product with that name'},
    ],
    description: [
      {type: 'whitespace', message: 'The product description cannot be empty or null.'},
    ],
    amount: [
      { type: 'required', message: 'The amount of the product is required.' },
      { type: 'min', message: 'The amount must be greater than 1.' },
    ],
    price: [
      { type: 'required', message: 'The price of the product is required.' },
      { type: 'min', message: 'The price must be greater than 1.' },
    ],
    brand: [{ type: 'required', message: 'The brand is required.' }],
    categoryList: [
      { type: 'required', message: 'The category list is required.' },
      {type: 'maxLengthArray',message: 'The category list cannot exceed 3 items.'},
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
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  getCategories() {
    this.stock.getCategories('ASC', 0, 100).subscribe({
      next: (rta: Page<BasicInfo>) => {
        this.pageCategory = rta;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  validateProduct() {
    if (this.formProduct.valid) {
      const product: ProductRequest = {
        name: this.formProduct.getRawValue().name,
        description: this.formProduct.getRawValue().description,
       amount: this.formProduct.getRawValue().amount ?? 0,
        price: this.formProduct.getRawValue().price ?? 0,
        brandId: Number(this.formProduct.getRawValue().brand.id),
        categoryIdsList:this.formProduct.getRawValue().categoryList.map(num => Number(num.id))
      };
      console.log(this.formProduct.getRawValue().categoryList.map(num => Number(num.id)))
      this.stock.createProduct(product).subscribe({
        next: (rta) => {
          this.router.navigate(['/panel/home']);
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.formProduct.markAllAsTouched();
    }
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
