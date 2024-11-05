/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectComponent } from './multi-select.component';
import { FormGroupDirective, FormControl, ReactiveFormsModule } from '@angular/forms';
import { BasicInfo } from '@models/basic-Info.model';
import { ControlErrorComponent } from '../control-error/control-error.component';
import { ElementRef } from '@angular/core';

describe('MultiSelectComponent', () => {
  let component: MultiSelectComponent;
  let fixture: ComponentFixture<MultiSelectComponent>;
  let mockFormGroupDirective: Partial<FormGroupDirective>;
  let testOptions: BasicInfo[] = [{ id: 3, name: 'Option 3', description: 'Description 3' }];

  beforeEach(async () => {
    mockFormGroupDirective = {
      control: {
        get: jest.fn().mockReturnValue(new FormControl())
      } as any
    };

    await TestBed.configureTestingModule({
      declarations: [MultiSelectComponent,ControlErrorComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: FormGroupDirective, useValue: mockFormGroupDirective }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jest.spyOn(component, 'onTouched');
    jest.spyOn(component, 'onChange');
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  test('should initialize formControl on ngOnInit', () => {
    component.controlName = 'testControl';
    component.ngOnInit();
    expect(mockFormGroupDirective.control?.get).toHaveBeenCalledWith('testControl');
    expect(component.formControl).toBeTruthy();
  });

  test('should register onChange function', () => {
    const fn = jest.fn();
    component.registerOnChange(fn);
    expect(component.onChange).toBe(fn);
  });

  test('should register onTouched function', () => {
    const fn = jest.fn();
    component.registerOnTouched(fn);
    expect(component.onTouched).toBe(fn);
  });

  test('should write value to selectedOptions', () => {
    component.writeValue(testOptions);
    expect(component.selectedOptions).toEqual(testOptions);
  });

  test('should toggle isDropdownOpen on toggleDropdown', () => {
    component.isDropdownOpen = false;
    component.toggleDropdown();
    expect(component.isDropdownOpen).toBeTruthy();
    component.toggleDropdown();
    expect(component.isDropdownOpen).toBeFalsy();
  });

  test('should add selected option on onOptionSelect', () => {
    component.onOptionSelect(testOptions[0]);
    expect(component.selectedOptions).toContain(testOptions[0]);
    expect(component.isDropdownOpen).toBeFalsy();
    expect(component.onChange).toHaveBeenCalled();
    expect(component.onTouched).toHaveBeenCalled();
  });

  test('should not add duplicate option on onOptionSelect', () => {
    component.onOptionSelect(testOptions[0]);
    component.onOptionSelect(testOptions[0]);
    expect(component.selectedOptions.length).toBe(1); 
    expect(component.onChange).toHaveBeenCalled();
  });

  test('should remove selected option on onOptionDelete', () => {
    component.selectedOptions.push(testOptions[0]);
    component.onOptionDelete(testOptions[0]);
    expect(component.selectedOptions).not.toContain(testOptions[0]);
    expect(component.onChange).toHaveBeenCalled();
  });
  test('should do nothing OnKeydown', () => {
    component.onKeydown();
    expect(component.onKeydown).toBeCalled;
  });  

  test('should close the dropdown when clicking outside the dropdown', () => {
    component.isDropdownOpen = true;
    const toggleElement = document.createElement('div');
    const optionElement = document.createElement('div');
    component.toggle = new ElementRef(toggleElement);
    component.option = new ElementRef(optionElement);

    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    document.body.dispatchEvent(event);

    expect(component.isDropdownOpen).toBeFalsy();
  });

  test('should not close the dropdown when clicking inside the dropdown', () => {
    component.isDropdownOpen = true;

    const toggleElement = document.createElement('div');
    const optionElement = document.createElement('div');
    component.toggle = new ElementRef(toggleElement);
    component.option = new ElementRef(optionElement);

    toggleElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

    expect(component.isDropdownOpen).toBeTruthy();

    optionElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

    expect(component.isDropdownOpen).toBeTruthy();
  });

});