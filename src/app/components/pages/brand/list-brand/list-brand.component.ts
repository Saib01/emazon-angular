import { Component, OnInit } from '@angular/core';
import { BasicInfo } from '@models/BasicInfo.model';
import { Page } from '@models/page.model';
import { StockService } from '@services/stock.service';

@Component({
  selector: 'app-list-brand',
  templateUrl: './list-brand.component.html',
  styleUrls: ['./list-brand.component.css']
})
export class ListBrandComponent implements OnInit {
  pageBrand: Page<BasicInfo> = {
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
    this.getBrands();
  }

  getBrands(){
    this.stock.getBrands(this.sortDirection, this.page, this.size)
    .subscribe({
      next: (rta: Page<BasicInfo>) => {
        this.pageBrand=rta;
      },
      error: (error)=>{
        console.log(error);
      }
    })
  }
  onPageNumberChange(target: number): void {
    this.page = target; 
    this.getBrands();
  }
  onPageSizeChange(target: number): void {
    this.size = target; 
    this.page=this.pageBrand.totalElements<this.size*this.page?0:this.page;
    this.getBrands();
  }
  onSortDirectionChange(target: string) {
    this.sortDirection = target; 
    this.getBrands();
  }
}
