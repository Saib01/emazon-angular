import { Component, OnInit } from '@angular/core';
import { BasicInfo } from '@models/BasicInfo.model';
import { Page } from '@models/page.model';
import { StockService } from '@services/stock.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {

  pageCategory: Page<BasicInfo> = {
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
  constructor(private readonly stock:StockService) { 
  }
  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.stock.getCategories(this.sortDirection, this.page, this.size)
    .subscribe({
      next: (rta: Page<BasicInfo>) => {
        this.pageCategory=rta;
      },
      error: (error)=>{
        console.log(error);
      }
    })
  }
  onPageNumberChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.page = Number(target.value); 
    this.getCategories();
  }
  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.size = Number(target.value); 
    console.log(this.page);
    this.page=this.pageCategory.totalElements<this.size*this.page?0:this.page;
    this.getCategories();
  }
  onSortDirectionChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.sortDirection = String(target.value); 
    this.getCategories();
  }
  
}