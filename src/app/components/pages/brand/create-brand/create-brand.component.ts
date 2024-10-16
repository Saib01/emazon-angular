import { Component} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BasicInfo } from '@models/BasicInfo.model';
import { ErrorMessages } from '@models/error-messages.model';
import { StockService } from '@services/stock.service';
import { NameValidator } from '@utils/nameValidator';
import { NoWhiteSpaceValidator } from '@utils/noWhitespaceValidator';

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.scss']
})
export class CreateBrandComponent {

  formBrand = this.formBuilder.nonNullable.group({
    name: ['', [NoWhiteSpaceValidator.checkNoWhitespace(),Validators.maxLength(50)],NameValidator.checkNameAvailability(this.stock,'brand')],
    description: ['', [NoWhiteSpaceValidator.checkNoWhitespace(), Validators.maxLength(120)]],
  });
  errorNameMessages: ErrorMessages[] = [
    {
      type: 'maxlength',
      message: 'The brand name has a maximum allowed characters of 50.',
    },
    { type: 'whitespace', message: 'The brand name cannot be empty or null.' },
    { type: 'notAvailable', message: 'There is already a brand with that name' },
  ];
  errorDescriptionMessages: ErrorMessages[] = [
    {
      type: 'maxlength',
      message: 'The brand description has a maximum allowed characters of 120.',
    },
    { type: 'whitespace', message: 'The brand description cannot be empty or null.' },
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
