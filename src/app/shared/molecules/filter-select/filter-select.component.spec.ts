/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, ElementRef } from '@angular/core';

import { FilterSelectComponent } from './filter-select.component';
import { FormGroupDirective, FormControl } from '@angular/forms';
import { BasicInfo } from '@models/basic-Info.model';
import { ControlErrorComponent } from '../control-error/control-error.component';
import { SimpleSelectComponent } from '../simple-select/simple-select.component';

describe('FilterSelectComponent', () => {
    let component: FilterSelectComponent;
    let fixture: ComponentFixture<FilterSelectComponent>;
    let mockFormGroupDirective: Partial<FormGroupDirective>;
    let testOption: BasicInfo = { id: 1, name: 'Test', description: 'Test description' }
    beforeEach(async () => {
      mockFormGroupDirective = {
        control: {
          get: jest.fn().mockReturnValue(new FormControl()) 
        } as any
      };
  
      await TestBed.configureTestingModule({
        declarations: [FilterSelectComponent,ControlErrorComponent],
        providers: [
          { provide: FormGroupDirective, useValue: mockFormGroupDirective }
        ]
      }).compileComponents();
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(FilterSelectComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    test('should create the component', () => {
      expect(component).toBeTruthy();
    });
  

  
  
    
    test('should do nothing OnKeydown', () => {
      component.onKeydown();
      expect(component.onKeydown).toBeCalled;
    });  

  
    test('should toggle isDropdownOpen on toggleDropdown', () => {
      component.isDropdownOpen = false;
      component.toggleDropdown();
      expect(component.isDropdownOpen).toBeTruthy();
      component.toggleDropdown();
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
    test('should set selectedOption ', () => {
      component.onOptionSelect(testOption);

      expect(component.selectedOption).toBe(testOption);
      expect(component.isDropdownOpen).toBeFalsy();
    });
  });
  
  