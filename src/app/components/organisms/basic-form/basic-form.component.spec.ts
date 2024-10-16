import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasicFormComponent } from './basic-form.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextComponent } from '../../molecules/input-text/input-text.component';
import { ControlErrorComponent } from '../../molecules/control-error/control-error.component';
import { TextAreaComponent } from '../../molecules/text-area/text-area.component';
import { ButtonComponent } from '../../atoms/basic-components/button/button.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('BasicFormComponent', () => {
  let component: BasicFormComponent;
  let fixture: ComponentFixture<BasicFormComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasicFormComponent,InputTextComponent,ControlErrorComponent,TextAreaComponent,ButtonComponent],
      imports: [ReactiveFormsModule,FormsModule,RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BasicFormComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    const formGroup: FormGroup = formBuilder.group({
      name: [''],
      description: ['']
    });
    component.formGroup = formGroup;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit validateEvent when validate method is called', () => {
    jest.spyOn(component.validateEvent, 'emit');

    component.validate();

    expect(component.validateEvent.emit).toHaveBeenCalled();
  });

  it('should have empty error messages by default', () => {
    expect(component.errorNameMessages).toEqual([]);
    expect(component.errorDescriptionMessages).toEqual([]);
  });

  it('should update error messages inputs', () => {
    const errorNameMessages = [{ message: 'Name is required', type: 'required' }];
    const errorDescriptionMessages = [{ message: 'Description is too long', type: 'maxlength' }];

    component.errorNameMessages = errorNameMessages;
    component.errorDescriptionMessages = errorDescriptionMessages;
    fixture.detectChanges();

    expect(component.errorNameMessages).toBe(errorNameMessages);
    expect(component.errorDescriptionMessages).toBe(errorDescriptionMessages);
  });
});