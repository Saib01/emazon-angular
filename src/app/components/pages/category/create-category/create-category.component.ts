import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorMessages } from '@models/error-messages.model';
import { StockService } from '@services/stock.service';
import { BasicInfo } from '@models/basic-Info.model';
import { CustomValidatorsAsync } from '@utils/custom-validators-async';
import { CustomValidators } from '@utils/custom-validators';
import { CATEGORY, CATEGORY_DESCRIPTION_EMPTY_OR_NULL_ERROR, CATEGORY_DESCRIPTION_MAX_LENGTH, CATEGORY_DESCRIPTION_MAX_MAX_LENGTH_ERROR, CATEGORY_NAME_EMPTY_OR_NULL_ERROR, CATEGORY_NAME_MAX_LENGTH, CATEGORY_NAME_MAX_LENGTH_ERROR, CATEGORY_NAME_NOT_AVAILABLE_ERROR } from '@shared/constants/category.constants'; 
const { checkNoWhitespace, WHITESPACE_ERROR } = CustomValidators;
const { checkNameAvailability, NOT_AVAILABLE_ERROR } = CustomValidatorsAsync;
const { maxLength } = Validators;
@Component({
  selector: 'app-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent{

  formCategory = this.formBuilder.nonNullable.group({
    name: ['', [checkNoWhitespace(),maxLength(CATEGORY_NAME_MAX_LENGTH)],checkNameAvailability(this.stock,CATEGORY)],
    description: ['', [checkNoWhitespace(),maxLength(CATEGORY_DESCRIPTION_MAX_LENGTH)]],
  });

  errorNameMessages: ErrorMessages[] = [
    {
      type: maxLength.name.toLowerCase(),
      message: CATEGORY_NAME_MAX_LENGTH_ERROR,
    },
    { type: WHITESPACE_ERROR, message: CATEGORY_NAME_EMPTY_OR_NULL_ERROR },
    { type: NOT_AVAILABLE_ERROR, message: CATEGORY_NAME_NOT_AVAILABLE_ERROR },
  ];
  errorDescriptionMessages: ErrorMessages[] = [
    {
      type: maxLength.name.toLowerCase(),
      message: CATEGORY_DESCRIPTION_MAX_MAX_LENGTH_ERROR,
    },
    { type: WHITESPACE_ERROR, message: CATEGORY_DESCRIPTION_EMPTY_OR_NULL_ERROR  },
  ];

  constructor(
    private readonly formBuilder: FormBuilder,
     private readonly router: Router
     ,private readonly stock:StockService
    ) {
        }
    
  validateCategory() {
    if (this.formCategory.valid) {
      const category: BasicInfo = {
        name: this.formCategory.getRawValue().name,
        description: this.formCategory.getRawValue().description
      };
      this.stock.createCategory(category)
      .subscribe({
        next: (rta) => {
            this.router.navigate(['/panel/category']);
        },
        error: (error)=>{
          console.log(error);
        }
      })
    } else {
      this.formCategory.markAllAsTouched();
    }
  }
}
