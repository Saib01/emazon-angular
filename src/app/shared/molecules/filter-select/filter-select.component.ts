import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BasicInfo } from '@models/basic-Info.model';

@Component({
  selector: 'app-filter-select',
  templateUrl: './filter-select.component.html',
  styleUrls: ['./filter-select.component.scss']
})
export class FilterSelectComponent implements OnInit{
  ngOnInit(): void {
    if (this.data.length > 0){
      if(typeof this.data[0] === 'number'){
        this.options = this.data.map(data => {
          return { id: Number(data), name: data.toString() };
        });
      }else if(typeof this.data[0] === 'string'){
        this.options = this.data.map(data => {
          return { id: 0, name: data.toString() };
        });
      }
    }
  }
  @Input() controlName!: string;
  @Input() options!: BasicInfo[] ;
  @Input() data:number[]|string[]=[];
  @Input() initialOption:number|string='none';
  @Output() optionSelect=new EventEmitter<BasicInfo>()
  @ViewChild('toggle') toggle!: ElementRef;
  @ViewChild('option') option!: ElementRef;
  isDropdownOpen = false;
  selectedOption: BasicInfo={
    id:0,
    name:''
  };

toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
}

onOptionSelect(option: BasicInfo) {
  this.selectedOption=option;
  this.isDropdownOpen = false; 
  this.optionSelect.emit(option); 
}


onKeydown() {
}

@HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (
    this.isDropdownOpen &&
    !this.toggle.nativeElement.contains(target) &&
    !this.option.nativeElement.contains(target)
  ) {
    this.isDropdownOpen= false;
  }
}
}
