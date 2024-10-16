import { NoWhiteSpaceValidator } from '@utils/noWhitespaceValidator';
import { NameValidator } from '@utils/nameValidator';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorMessages } from '@models/error-messages.model';
import { StockService } from '@services/stock.service';
import { BasicInfo } from '@models/BasicInfo.model';
@Component({
  selector: 'app-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent{

  formCategory = this.formBuilder.nonNullable.group({
    name: ['', [NoWhiteSpaceValidator.checkNoWhitespace(),Validators.maxLength(50)],NameValidator.checkNameAvailability(this.stock)],
    description: ['', [NoWhiteSpaceValidator.checkNoWhitespace(), Validators.maxLength(90)]],
  });

  errorNameMessages: ErrorMessages[] = [
    {
      type: 'maxlength',
      message: 'The category name has a maximum allowed characters of 50.',
    },
    { type: 'whitespace', message: 'The category name cannot be empty or null.' },
    { type: 'notAvailable', message: 'There is already a category with that name' },
  ];
  errorDescriptionMessages: ErrorMessages[] = [
    {
      type: 'maxlength',
      message: 'The category description has a maximum allowed characters of 90.',
    },
    { type: 'whitespace', message: 'The category description cannot be empty or null.' },
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
