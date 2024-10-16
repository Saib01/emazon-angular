import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BasicInfo } from '@models/BasicInfo.model';

@Component({
  selector: 'app-basic-table-info',
  templateUrl: './basic-table-info.component.html',
  styleUrls: ['./basic-table-info.component.scss']
})
export class BasicTableInfoComponent{
  @Input() totalPages:number=0;
  @Input() elements:BasicInfo[]=[];
  @Output() pageNumberEvent = new EventEmitter<number>();
  @Output() pageSizeEvent = new EventEmitter<number>();
  @Output() sortDirectionEvent = new EventEmitter<string>();
  constructor() { }

  onPageNumberChange(event: Event): void {
    this.pageNumberEvent.emit(Number((event.target as HTMLSelectElement).value));
  }
  onPageSizeChange(event: Event): void {
    this.pageSizeEvent.emit(Number((event.target as HTMLSelectElement).value));
  }
  onSortDirectionChange(event: Event) {
    this.sortDirectionEvent.emit(String((event.target as HTMLSelectElement).value));
  }
}
