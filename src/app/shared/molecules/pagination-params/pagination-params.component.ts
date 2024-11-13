import { Component, EventEmitter, Input, Output} from '@angular/core';
import { BasicInfo } from '@models/basic-Info.model';

@Component({
  selector: 'app-pagination-params',
  templateUrl: './pagination-params.component.html',
  styleUrls: ['./pagination-params.component.scss']
})
export class PaginationParamsComponent{
  @Input() totalPages:number=0;
  @Input() isSortByActive:boolean=false;
  @Output() pageNumberEvent = new EventEmitter<number>();
  @Output() pageSizeEvent = new EventEmitter<number>();
  @Output() sortDirectionEvent = new EventEmitter<string>();

  onPageNumberChange(event: BasicInfo): void {
    this.pageNumberEvent.emit(Number(event.name)-1);
  }
  onPageSizeChange(event: BasicInfo): void {
    this.pageSizeEvent.emit(Number(event.name));
  }
  onSortDirectionChange(event: BasicInfo) {
    this.sortDirectionEvent.emit(event.name);
  }


}
