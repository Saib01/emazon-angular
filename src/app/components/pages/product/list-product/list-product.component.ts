import { Component, OnInit } from '@angular/core';
import { FieldsToShow } from '@models/field-to-show.model';
import { Page } from '@models/page.model';
import { Product } from '@models/product.model';
import { StockService } from '@services/stock.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  fieldsToShow:FieldsToShow[]=[
    {name:'id',type:'number'},
    {name:'name'},
    {name:'description'},
    {name:'amount',type:'number'},
    {name:'price',type:'number'},
    {name:'brand',accessValue:'brandResponse.name'},
    {name:'categories',accessValue:'categoryResponseList'},
  ];

  regexNumberClass!:RegExp;
  numberFields:string[] = ["price","id","amount"];
  pageProduct: Page<Product> = {
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
  page:number=0;
  size:number=5;
  sortDirection:string="ASC";
  sortBy:string="productName";
  constructor(private readonly stock:StockService) { 
  }
  ngOnInit(): void {
   this.getProducts();
   this.getRegexForHtmlNumberClass();
  }
  getProducts() {
    this.stock.getProducts(this.sortDirection, this.page, this.size,this.sortBy)
    .subscribe({
      next: (rta: Page<Product>) => {
        this.pageProduct=rta;
      },
      error: (error)=>{
        console.log(error);
      }
    })
  }
  getRegexForHtmlNumberClass(){
    this.regexNumberClass = new RegExp(`(${this.numberFields.join('|')})`); 
  }
  onPageSizeChange(target: number): void  {
    this.size = target; 
    this.page=this.pageProduct.totalElements<this.size*this.page?0:this.page;
    this.getProducts();
  }
  onSortDirectionChange(target: string) {
    this.sortDirection = target; 
    this.getProducts();
  }
  onPageNumberChange(target: number): void {
    this.page= target; 
    this.getProducts();
  }
  onSortByChange(target: string) {
    this.sortBy=target.concat('Name'); 
    this.getProducts();
  }
}