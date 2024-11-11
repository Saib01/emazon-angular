import { Component, ElementRef, forwardRef, HostListener, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BasicInfo } from '@models/basic-Info.model';
import { ErrorMessages } from '@models/error-messages.model';

@Component({
  selector: 'simple-select',
  templateUrl: './simple-select.component.html',
  styleUrls: ['./simple-select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SimpleSelectComponent),
    multi: true,
  }]
})
export class SimpleSelectComponent  implements ControlValueAccessor {
  formControl!: FormControl;
  @Input() controlName!: string;
  @Input() options!: BasicInfo[] ;
  @Input() errorMessages: ErrorMessages[] = [];
  @ViewChild('toggle') toggle!: ElementRef;
  @ViewChild('option') option!: ElementRef;

  isDropdownOpen = false;
  selectedOption: BasicInfo={
    id:0,
    name:''
  };
  onChange: (selectedOptions: BasicInfo ) => void = () => {};
  onTouched: () => void = () => {};
constructor(private readonly rootFormGroup: FormGroupDirective) {}


  writeValue(elements: BasicInfo): void {
    this.selectedOption = elements;
  }
  registerOnChange(fn: any): void {
    this.onChange=fn;
  
  }
  registerOnTouched(fn: any): void {
    this.onTouched=fn;
  }

  
  ngOnInit(): void {
    this.formControl = this.rootFormGroup.control.get(this.controlName) as FormControl;
  }


toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
}

onOptionSelect(option: BasicInfo) {
  this.selectedOption=option;
  this.onTouched();
  this.onChange(this.selectedOption);
  this.isDropdownOpen = false; 
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
