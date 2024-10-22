import { Attribute, Component, OnInit } from '@angular/core';
import { Page } from '@models/page.model';
import { Product } from '@models/product.model';
import { StockService } from '@services/stock.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
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
  onPageSizeChange(event: Event): void {
    this.size = Number((event.target as HTMLSelectElement).value); 
    this.page=this.pageProduct.totalElements<this.size*this.page?0:this.page;
    this.getProducts();
  }
  onSortDirectionChange(event: Event) {
    this.sortDirection = String((event.target as HTMLSelectElement).value); 
    this.getProducts();
  }
  onPageNumberChange(event: Event): void {
    this.page = Number((event.target as HTMLSelectElement).value); 
    this.getProducts();
  }
  onSortByChange(event: Event) {
    this.sortBy=String((event.target as HTMLSelectElement).value).concat('Name'); 
    this.getProducts();
  }

  fieldsToShow: string[] = ['id', 'name', 'description', 'amount', 'price', 'brandResponse.name', 'categoryResponseList'];

  get(item: any, field: string): any {
    return field.split('.').reduce((acc, part) => acc?.[part], item);
  }
  isArrayWithThreeElements(value: any): boolean {
    return Array.isArray(value);
  }
  textNumberClass(attribute:string){
    let regex=/(id|price|amount)/;
    return regex.exec(attribute);
  }
}