import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BasicInfo } from '@models/basic-Info.model';
import { FieldsToShow } from '@models/field-to-show.model';
import { Page } from '@models/page.model';
import { ShoppingCartItem } from '@models/shopping-cart-item';
import { Status } from '@models/status.model';
import { ShoppingCartService } from '@services/shopping-cart.service';
import { StockService } from '@services/stock.service';
import { TEMPLATE_NO_STOCK_ERROR } from '@shared/constants/product.constants';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  status: Status = {
    code: null,
    messages: new Map([[HttpStatusCode.Created, '']]),
    tittles: new Map([[true,''],[false, 'Error removing item from cart']])
  }
  isRemoveAlertActive:boolean=false;

  page: number = 0;
  size: number = 5;
  sortDirection: string = "ASC";
  brandName: string = "";
  categoryName: string = "";
  categoryList: BasicInfo[] = [{ id: 0, name: 'none', description: '' }];
  brandList: BasicInfo[] = [{ id: 0, name: 'none', description: '' }];

  total: number = 0;

  userShoppingCart: Page<ShoppingCartItem> = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    pageNumber: 0,
    first: true,
    last: true,
    pageSize: 10,
    numberOfElements: 0,
    ascending: false,
    empty: true
  };


  regexNumberClass!: RegExp;
  fieldsToShow: FieldsToShow[] = [
    { name: 'id', type: 'number', size: 'small' },
    { name: 'name', size: 'large' },
    { name: 'amount', type: 'number', accessValue: 'unitsInCart', size: 'medium' },
    { name: 'stock', type: 'number', accessValue: 'amount', size: 'medium' },
    { name: 'price', type: 'number', size: 'medium' },
    { name: 'brand', accessValue: 'brandResponse.name', size: 'large' },
    { name: 'categories', accessValue: 'categoryResponseList', size: 'large' },
  ];
  fieldNames = this.fieldsToShow.map(field => field.name);
  fieldAccessValues = this.fieldsToShow.map(field => field.accessValue ? field.accessValue : field.name);

  itemToRemove:ShoppingCartItem|null=null;
  
  constructor(private readonly shoppingCartService: ShoppingCartService, private readonly stock: StockService) { }
  ngOnInit(): void {
    this.getRegexForHtmlNumberClass();
    this.getShoppingCart();
    this.getCategories();
    this.getBrands();
  }
  getRegexForHtmlNumberClass() {
    const numberFields = this.fieldsToShow.filter(field => field.type === 'number').map(field => field.accessValue ? field.accessValue : field.name);
    this.regexNumberClass = new RegExp(`(${numberFields.join('|')}|amount|stock)`);
  }

  getCategories() {
    this.stock.getCategories('ASC', 0, 100)
      .subscribe({
        next: (rta: Page<BasicInfo>) => {
          this.categoryList.push(...rta.content);
        }
      })
  }
  getBrands() {
    this.stock.getBrands('ASC', 0, 100)
      .subscribe({
        next: (rta: Page<BasicInfo>) => {
          this.brandList.push(...rta.content);
        }
      })
  }
  getShoppingCart() {
    this.shoppingCartService.getShoppingCart(this.sortDirection, this.page, this.size, this.brandName, this.categoryName).subscribe({
      next: (response) => {
        this.userShoppingCart = response;
        this.total = 0;
        this.userShoppingCart.content.forEach(item => {
          if (item.amount > 0) {
            this.total = this.total + item.unitsInCart * item.price;
          }
        });
      }
    });
  }
  
  removeProduct() {
    this.isRemoveAlertActive=false;
    if (this.itemToRemove&&this.itemToRemove.id) {
      const amountToRemove=this.itemToRemove.amount;
      this.shoppingCartService.removeFromShoppingCart(this.itemToRemove).subscribe({
        next: () => {
          this.userShoppingCart.content = this.userShoppingCart.content.filter(
            (item) => item !== this.itemToRemove
          );
            if(amountToRemove>0){
              this.total=this.total-amountToRemove;
            }
         
        },
        error:(error)=>{
          this.status.code = error.status;
        }
      });
    };
  }
  get(item: any, field: string): any {
    return field.split('.').reduce((acc, part) => acc?.[part], item);
  }

  isArrayWithThreeElements(value: any): boolean {
    return Array.isArray(value);
  }
  textNumberClass(attribute: string) {
    return this.regexNumberClass.exec(attribute);
  }

  onBrandFilterChange(event: BasicInfo): void {
    this.brandName = event.name != "none" ? event.name : "";
    this.getShoppingCart();
  }
  onCategoryFilterChange(event: BasicInfo): void {
    this.categoryName = event.name != "none" ? event.name : "";
    this.getShoppingCart();
  }
  onPageNumberChange(event: number): void {
    this.page = event
    this.getShoppingCart();
  }
  onPageSizeChange(event: number): void {
    this.size = event;
    this.getShoppingCart();
  }
  onSortDirectionChange(event: string): void {
    this.sortDirection = event;
    this.getShoppingCart();
  }


  messageForInsufficientStock(restockDate: number): string {
    const today = new Date();
    const monthFormatter = new Intl.DateTimeFormat('es', { month: 'long' });

    let monthName: string;

    if (today.getDate() > restockDate) {
      const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, restockDate);
      monthName = monthFormatter.format(nextMonth);
    } else {
      monthName = monthFormatter.format(today);
    }

    return this.formatMessage(TEMPLATE_NO_STOCK_ERROR, restockDate, monthName);
  }

  formatMessage(template: string, day: number, month: string): string {
    return template.replace("{0}", day.toString()).replace("{1}", month);
  }

  setIsRemoveAlertActive(value:boolean,item?:ShoppingCartItem){
    this.isRemoveAlertActive=value;
    if(item){
      this.itemToRemove=item;
    }
  }
}
