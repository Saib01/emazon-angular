import { Component, ElementRef, forwardRef, HostListener, Input, ViewChild} from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BasicInfo } from '@models/basic-Info.model';
import { ErrorMessages } from '@models/error-messages.model';

@Component({
  selector: 'multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiSelectComponent),
    multi: true,
  }]
})
export class MultiSelectComponent implements ControlValueAccessor {
  formControl!: FormControl;
  @Input() name: string = '';
  @Input() placeHolder: string = '';
  @Input() errorMessages: ErrorMessages[] = [];
  @Input() type: string = 'text';
  @Input() controlName!: string;
  @Input() options!: BasicInfo[] ;

  @ViewChild('toggle') toggle!: ElementRef;
  @ViewChild('option') option!: ElementRef;
  
  isDropdownOpen = false;
  selectedOptions: BasicInfo[] = [];
  onChange: (selectedOptions: BasicInfo[]) => void = () => {};
  onTouched: () => void = () => {};
constructor(private readonly rootFormGroup: FormGroupDirective) {}


  writeValue(elements: BasicInfo[]): void {
    this.selectedOptions = elements;
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
  const index=this.selectedOptions.findIndex(category=>category.name===option.name);
  if(index===-1){
    this.selectedOptions.push(option);
    this.onChange(this.selectedOptions);
  }
  this.isDropdownOpen = false; 
  this.onTouched();
}
onOptionDelete(option: BasicInfo){
  const index=this.selectedOptions.findIndex(category=>category.name===option.name);
  if(index!==-1){
    this.selectedOptions.splice(index,1);
    this.onChange(this.selectedOptions);
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
    this.isDropdownOpen= false;
  }
}
}
