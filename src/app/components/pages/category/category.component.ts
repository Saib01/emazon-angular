import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RequestStatus } from '../../../models/request-status.model';
import { Router } from '@angular/router';
import { noWhitespaceValidator } from 'src/app/utils/nowhitespaceValidator';
import { NameValidator } from '@utils/namevalidator';
import { ErrorMessages } from '../../../models/error-messages.model';
import { StockService } from '@services/Stock.service';
import { Category } from '@models/category.model';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent{

  formCategory = this.formBuilder.nonNullable.group({
    name: ['', [noWhitespaceValidator(),Validators.maxLength(50)],NameValidator.checkNameAvailability(this.stock)],
    description: ['', [noWhitespaceValidator(), Validators.maxLength(90)]],
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

  showRegister = false;
  status: RequestStatus = 'init';
  statusUser: RequestStatus = 'init';
  
  constructor(
    private readonly formBuilder: FormBuilder,
     private readonly router: Router
     ,private readonly stock:StockService
    ) {
        }

  
  validateCategory(event: Event) {
    if (this.formCategory.valid) {
      const category: Category = {
        name: this.formCategory.getRawValue().name,
        description: this.formCategory.getRawValue().description
      };
      this.stock.create(category)
      .subscribe({
        next:(rta)=>{
          this.status='success';
          this.router.navigate(['panel/home']);
        },
        error: (error)=>{
          this.status='failed';
          console.log(error);
        }
      })
    } else {
      this.formCategory.markAllAsTouched();
    }
  }
}
