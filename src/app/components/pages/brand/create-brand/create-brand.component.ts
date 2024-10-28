import { Component} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BasicInfo } from '@models/basic-Info.model';
import { ErrorMessages } from '@models/error-messages.model';
import { StockService } from '@services/stock.service';
import { CustomValidatorsAsync } from '@utils/custom-validators-async';
import { CustomValidators } from '@utils/custom-validators';
import { BRAND_NAME_MAX_LENGTH, BRAND_DESCRIPTION_MAX_LENGTH, BRAND, BRAND_NAME_MAX_LENGTH_ERROR, BRAND_NAME_EMPTY_OR_NULL_ERROR, BRAND_NAME_NOT_AVAILABLE_ERROR, BRAND_DESCRIPTION_MAX_MAX_LENGTH_ERROR, BRAND_DESCRIPTION_EMPTY_OR_NULL_ERROR } from '@shared/constants/brand.constants';

const { checkNoWhitespace, WHITESPACE_ERROR } = CustomValidators;
const { checkNameAvailability, NOT_AVAILABLE_ERROR } = CustomValidatorsAsync;
const { maxLength } = Validators;
@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.scss']
})
export class CreateBrandComponent {

  formBrand = this.formBuilder.nonNullable.group({
    name: ['', [checkNoWhitespace(),maxLength(BRAND_NAME_MAX_LENGTH)],checkNameAvailability(this.stock,BRAND)],
    description: ['', [checkNoWhitespace(), maxLength(BRAND_DESCRIPTION_MAX_LENGTH)]],
  });
  errorNameMessages: ErrorMessages[] = [
    {
      type: maxLength.name.toLowerCase(),
      message: BRAND_NAME_MAX_LENGTH_ERROR,
    },
    { type: WHITESPACE_ERROR, message: BRAND_NAME_EMPTY_OR_NULL_ERROR},
    { type: NOT_AVAILABLE_ERROR, message: BRAND_NAME_NOT_AVAILABLE_ERROR },
  ];
  errorDescriptionMessages: ErrorMessages[] = [
    {
      type: maxLength.name.toLowerCase(),
      message: BRAND_DESCRIPTION_MAX_MAX_LENGTH_ERROR,
    },
    { type: WHITESPACE_ERROR, message: BRAND_DESCRIPTION_EMPTY_OR_NULL_ERROR },
  ];

  constructor(
    private readonly formBuilder: FormBuilder,
     private readonly router: Router
     ,private readonly stock:StockService
    ) {
        }
    
  validateBrand() {
    if (this.formBrand.valid) {
      const brand: BasicInfo = {
        name: this.formBrand.getRawValue().name,
        description: this.formBrand.getRawValue().description
      };
      this.stock.createBrand(brand)
      .subscribe({
        next: (rta) => {
            this.router.navigate(['/panel/brand']);
        },
        error: (error)=>{
          console.log(error);
        }
      })
    } else {
      this.formBrand.markAllAsTouched();
    }
  }
}
