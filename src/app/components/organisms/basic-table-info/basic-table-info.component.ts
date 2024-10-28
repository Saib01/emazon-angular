import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BasicInfo } from '@models/basic-Info.model';
import { FieldsToShow } from '@models/field-to-show.model';
import { Product } from '@models/product.model';

@Component({
  selector: 'app-basic-table-info',
  templateUrl: './basic-table-info.component.html',
  styleUrls: ['./basic-table-info.component.scss']
})
export class BasicTableInfoComponent  implements OnInit{
  regexNumberClass!:RegExp;
  @Input() totalPages:number=0;
  @Input() elements:BasicInfo[]|Product[]=[];
  @Input() fieldsToShow:FieldsToShow[]=[
    {name:'id',type:'number'},
    {name:'name'},
    {name:'description'}
  ];
  @Input() sortByOptions:string[]=[];
  @Output() pageNumberEvent = new EventEmitter<number>();
  @Output() pageSizeEvent = new EventEmitter<number>();
  @Output() sortDirectionEvent = new EventEmitter<string>();
  @Output() sortByEvent=new EventEmitter<string>();
  constructor() { }
  ngOnInit(): void { 
   this.getRegexForHtmlNumberClass();
  }
  getRegexForHtmlNumberClass(){
    const numberFields=this.fieldsToShow.filter(field=>field.type==='number').map(field=>field.name);
    this.regexNumberClass = new RegExp(`(${numberFields.join('|')})`); 
  }
  onPageNumberChange(event: Event): void {
    this.pageNumberEvent.emit(Number((event.target as HTMLSelectElement).value));
  }
  onPageSizeChange(event: Event): void {
    this.pageSizeEvent.emit(Number((event.target as HTMLSelectElement).value));
  }
  onSortDirectionChange(event: Event) {
    this.sortDirectionEvent.emit(String((event.target as HTMLSelectElement).value));
  }
  onSortByChange(event: Event) {
    this.sortByEvent.emit(String((event.target as HTMLSelectElement).value)); 
  }
  isArrayWithThreeElements(value: any): boolean {
    return Array.isArray(value);
  }
  textNumberClass(attribute:string){
    return this.regexNumberClass.exec(attribute);
  }
  get(item: any, field: string): any {
    return field.split('.').reduce((acc, part) => acc?.[part], item);
  }
  getFieldsNames(){
    return this.fieldsToShow.map(field=>field.name);
  }
  getFieldsAccessValues(){
    return this.fieldsToShow.map(field=> field.accessValue ? field.accessValue : field.name);
  }
}
