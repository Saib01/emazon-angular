import {ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ControlErrorComponent } from '../../../../src/app/components/molecules/control-error/control-error.component';
import { ReactiveFormsModule, FormGroupDirective, FormControl, FormGroup } from '@angular/forms';

describe('ControlErrorComponent', () => {
  let component: ControlErrorComponent;
  let fixture: ComponentFixture<ControlErrorComponent>;

  beforeEach(async() => {
    const formGroup = new FormGroup({
      testControl: new FormControl(''),
    });
    
    TestBed.configureTestingModule({
      declarations: [ ControlErrorComponent ],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: FormGroupDirective,
          useValue: {
            control: formGroup, 
          },
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlErrorComponent);
    component = fixture.componentInstance;
    component.controlName='testControl';
    component.errorMessages = [{ type: 'required', message: 'This field is required' }];
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
  test('should display error messages when the form control is invalid and touched', () => {
    component.formControl.setErrors({ required: true });
    component.formControl.markAsTouched(); 
    fixture.detectChanges();

    const errorElement: DebugElement = fixture.debugElement.query(By.css('.error__name'));
    expect(errorElement.nativeElement.textContent).toContain('This field is required');
  });
});
