import {ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleSelectComponent } from './simple-select.component';
import { FormGroupDirective, FormControl} from '@angular/forms';
import { BasicInfo } from '@models/basic-Info.model';
import { ControlErrorComponent } from '../control-error/control-error.component';
import { ElementRef } from '@angular/core';



describe('SimpleSelectComponent', () => {
  let component: SimpleSelectComponent;
  let fixture: ComponentFixture<SimpleSelectComponent>;
  let mockFormGroupDirective: Partial<FormGroupDirective>;
  let testOption: BasicInfo = { id: 1, name: 'Test', description: 'Test description' }
  beforeEach(async () => {
    mockFormGroupDirective = {
      control: {
        get: jest.fn().mockReturnValue(new FormControl()) 
      } as any
    };

    await TestBed.configureTestingModule({
      declarations: [SimpleSelectComponent,ControlErrorComponent],
      providers: [
        { provide: FormGroupDirective, useValue: mockFormGroupDirective }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

  
  test('should do nothing OnKeydown', () => {
    component.onKeydown();
    expect(component.onKeydown).toBeCalled;
  });  
  
  test('should register onTouched function', () => {
    const fn = jest.fn();
    component.registerOnTouched(fn);
    expect(component.onTouched).toBe(fn);
  });

  test('should write value to selectedOption', () => {
    component.writeValue(testOption);
    expect(component.selectedOption).toBe(testOption);
  });

  test('should toggle isDropdownOpen on toggleDropdown', () => {
    component.isDropdownOpen = false;
    component.toggleDropdown();
    expect(component.isDropdownOpen).toBeTruthy();
    component.toggleDropdown();
    expect(component.isDropdownOpen).toBeFalsy();
  });

  test('should set selectedOption and call onTouched and onChange on onOptionSelect', () => {
    jest.spyOn(component, 'onTouched');
    jest.spyOn(component, 'onChange');

    component.onOptionSelect(testOption);

    expect(component.selectedOption).toBe(testOption);
    expect(component.onTouched).toHaveBeenCalled();
    expect(component.onChange).toHaveBeenCalledWith(testOption);
    expect(component.isDropdownOpen).toBeFalsy();
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

