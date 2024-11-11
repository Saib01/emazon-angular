import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BasicInfo } from '@models/basic-Info.model';
import { ErrorMessages } from '@models/error-messages.model';
import { Product } from '@models/product.model';
import { ShoppingCartRequest } from '@models/shopping-cart-request';
import { Status } from '@models/status.model';
import { UserInfo } from '@models/user-info.model';
import { AuthService } from '@services/auth.service';
import { ShoppingCartService } from '@services/shopping-cart.service';
import { StockService } from '@services/stock.service';
import { PRODUCT_AMOUNT_REQUIRED_ERROR, PRODUCT_URL } from '@shared/constants/product.constants';
import { CustomValidators } from '@utils/custom-validators';
const {
  ID_ZERO_ERROR,idNotZeroValidator
} = CustomValidators;
@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.scss']
})
export class ShowProductComponent implements OnInit {
  status: Status = {
    code: null,
    messages: new Map([[HttpStatusCode.Created, ''],[HttpStatusCode.Conflict, 'The maximum number of products per category has been reached.']]),
    tittles: new Map([[true, 'Product added to cart'],[false, 'Failed to add product to cart']])
  } 
  id: number = 0;
  product: Product = {
    name: '',
    description: '',
    amount: 0,
    price: 0,
    brandResponse: {
      name: '',
      description: ''
    },
    categoryResponseList: [{
      name: '',
      description: ''
    }]
  }
  options: BasicInfo[] = [];
  user!:UserInfo|null;
  constructor(private readonly router: Router,
    private readonly stockService: StockService,
    private readonly formBuilder: FormBuilder,
    private readonly authService:AuthService,
    private readonly shoppingCartService:ShoppingCartService) { }
  formAddToCart = this.formBuilder.nonNullable.group({
    amount: [   {
      id: 0,
      name: '',
    } as BasicInfo, [idNotZeroValidator]],
  });
  
  errorMessages: { [key: string]: ErrorMessages[] } = {
    amount: [
      {
        type: ID_ZERO_ERROR,
        message: PRODUCT_AMOUNT_REQUIRED_ERROR,
      }
    ]
  };
  
  ngOnInit(): void {
    this.getProduct();
    this.authService.getUserStatus().subscribe(userStatus => {
      this.user=userStatus;
   });
  }

  getProduct() {
    this.id = Number(this.router.routerState.snapshot.url.split('/').pop());
    if (isNaN(this.id)) {
      this.router.navigate([PRODUCT_URL]);
      return;
    }
    this.stockService.getProduct(this.id)
      .subscribe({
        next: (product: Product) => {
          this.product = product;
          this.options = this.getOptions(product.amount);
        }
      });
  }
  getOptions(end: number): BasicInfo[] {
    const options = [];
    for (let i = 1; i <= end; i++) {
      options.push({ id: i, name: i.toString() });
    }
    return options;
  }
  addToShoppingCart() {
    if (this.formAddToCart.valid) {
      if(this.user!=null){
        const shoppingCartRequest:ShoppingCartRequest={
          idProduct: this.id,
          amount: Number(this.formAddToCart.value.amount?.id),
        }
        this.shoppingCartService.addToShoppingCart(shoppingCartRequest).subscribe({
          next: (response) => this.updateStatusCode(response.status),
          error: (error) => this.updateStatusCode(error.status),
        });
      }else{
        this.router.navigate(['/login']);
      }

    } else {
      this.formAddToCart.markAllAsTouched();
    }
  }
  updateStatusCode(status: number) {
    this.status.code = status;
  }
}
