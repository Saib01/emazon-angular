import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BasicInfo } from '@models/basic-Info.model';
import { FieldsToShow } from '@models/field-to-show.model';
import { Product } from '@models/product.model';
import { UserInfo } from '@models/user-info.model';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-basic-table-info',
  templateUrl: './basic-table-info.component.html',
  styleUrls: ['./basic-table-info.component.scss']
})
export class BasicTableInfoComponent  implements OnInit{
  regexNumberClass!:RegExp;
  user!:UserInfo|null;
  @Input() totalPages:number=0;
  @Input() elements:Product[]|BasicInfo[]=[];
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
  constructor(private readonly authService:AuthService) { }
  
  ngOnInit(): void { 
   this.getRegexForHtmlNumberClass();
   this.authService.getUserStatus().subscribe(userStatus => {
    this.user=userStatus;
 });
  }
  getRegexForHtmlNumberClass(){
    const numberFields=this.fieldsToShow.filter(field=>field.type==='number').map(field=>field.name);
    this.regexNumberClass = new RegExp(`(${numberFields.join('|')})`); 
  }
  onPageNumberChange(event: number): void {
    this.pageNumberEvent.emit(event);
  }
  onPageSizeChange(event: number): void {
    this.pageSizeEvent.emit(event);
  }
  onSortDirectionChange(event: string) {
    this.sortDirectionEvent.emit(event);
  }
  onSortByChange(event: BasicInfo) {
    this.sortByEvent.emit(event.name); 
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
  isProduct(item: BasicInfo | Product): item is Product {
    return (item as Product).amount !== undefined;
  }
}
