import { Component, OnInit } from '@angular/core';
import { BasicInfo } from '@models/basic-Info.model';
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
      }
    })
  }
  onPageNumberChange(target: number): void {
    this.page = target; 
    this.getCategories();
  }
  onPageSizeChange(target: number): void {
    this.size = target; 
    this.page=this.pageCategory.totalElements<this.size*this.page?0:this.page;
    this.getCategories();
  }
  onSortDirectionChange(target: string) {
    this.sortDirection = target; 
    this.getCategories();
  }
  
}