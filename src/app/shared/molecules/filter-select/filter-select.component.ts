import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { BasicInfo } from '@models/basic-Info.model';

@Component({
  selector: 'app-filter-select',
  templateUrl: './filter-select.component.html',
  styleUrls: ['./filter-select.component.scss']
})
export class FilterSelectComponent implements OnInit, OnChanges {
  @Input() elementSize: 'small' | 'large'|'medium' = 'small';
  @Input() controlName!: string;
  @Input() options!: BasicInfo[];
  @Input() data: number[] | string[] = [];
  @Input() initialOption: number | string = 'none';
  @Output() optionSelect = new EventEmitter<BasicInfo>()
  @ViewChild('toggle') toggle!: ElementRef;
  @ViewChild('option') option!: ElementRef;
  isDropdownOpen = false;
  selectedOption: BasicInfo = {
    id: 0,
    name: ''
  };
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.convertToBasicInfo();
    }
  }
  ngOnInit(): void {
    this.selectedOption.name = this.initialOption.toString();
    this.convertToBasicInfo();
  }
  private convertToBasicInfo() {
    if (this.data.length > 0) {
      if (typeof this.data[0] === 'number') {
        this.options = this.data.map(data => {
          return { id: Number(data), name: data.toString() };
        });
      } else if (typeof this.data[0] === 'string') {
        this.options = this.data.map(data => {
          return { id: 0, name: data.toString() };
        });
      }
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onOptionSelect(option: BasicInfo) {
    this.isDropdownOpen = false;
    if (this.selectedOption.name !== option.name) {
      this.selectedOption = option;
      this.optionSelect.emit(option);
    }
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
      this.isDropdownOpen = false;
    }
  }
}
