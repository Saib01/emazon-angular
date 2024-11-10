import {ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ControlErrorComponent } from './control-error.component';
import { ReactiveFormsModule, FormGroupDirective, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '@utils/custom-validators';

describe('ControlErrorComponent', () => {
  let component: ControlErrorComponent;
  let fixture: ComponentFixture<ControlErrorComponent>;
  let mockFormGroup: FormGroup;

  beforeEach(async() => {
    mockFormGroup = new FormGroup({
      testControl: new FormControl('', [Validators.required]), 
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, {
      validators: [CustomValidators.MatchValidator('password', 'confirmPassword')],
    });
    
    TestBed.configureTestingModule({
      declarations: [ ControlErrorComponent ],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: FormGroupDirective,
          useValue: {
            control: mockFormGroup, 
          },
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlErrorComponent);
    component = fixture.componentInstance;
  });

  test('should create', () => {
    component.controlName='testControl';
    component.errorMessages = [{ type: 'required', message: 'This field is required' }];
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  test('should display error messages when the form control is invalid and touched', () => {
    component.controlName='testControl';
    component.errorMessages = [{ type: 'required', message: 'This field is required' }];
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.formControl.markAsTouched(); 
    fixture.detectChanges();

    const errorElement: DebugElement = fixture.debugElement.query(By.css('.error__name'));
    expect(errorElement.nativeElement.textContent).toContain('This field is required');
  });

  test('should display error messages when the form validator is invalid and touched', () => {
    mockFormGroup.get('testControl')?.setValue('123456');
    mockFormGroup.get('password')?.setValue('123456');
    mockFormGroup.get('confirmPassword')?.setValue('1234567');
    component.controlName='confirmPassword';
    component.errorMessages = [{ type: 'mismatch', message: 'password do not match' }];
    component.typeError='form';
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.formControl.markAllAsTouched();
    fixture.detectChanges();
    const errorElement: DebugElement = fixture.debugElement.query(By.css('.error__name'));
    expect(errorElement.nativeElement.textContent).toContain('password do not match');
  })

});
