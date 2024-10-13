import { ComponentFixture, TestBed } from "@angular/core/testing";
import { InputTextComponent } from "../../../../src/app/components/molecules/input-text/input-text.component";
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from "@angular/forms";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { ControlErrorComponent } from "../../../../src/app/components/molecules/control-error/control-error.component";

describe('InputTextComponent', () => {
  let component: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;

  beforeEach(async () => {
    const formGroup = new FormGroup({
      testControl: new FormControl(''),
    });

    await TestBed.configureTestingModule({
      declarations: [InputTextComponent,ControlErrorComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: FormGroupDirective,
          useValue: {
            control: formGroup, 
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTextComponent);
    component = fixture.componentInstance;

    component.controlName = 'testControl';
    component.placeHolder = 'Test Placeholder';
    component.errorMessages = [{ type: 'required', message: 'This field is required' }];

    fixture.detectChanges();
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  test('should initialize formControl from FormGroupDirective', () => {

    expect(component.formControl).toBeTruthy();
    expect(component.formControl).toBeInstanceOf(FormControl);
  });

  test('should render the input with the correct placeholder', () => {
    const inputElement: DebugElement = fixture.debugElement.query(By.css('input'));
    expect(inputElement.nativeElement.getAttribute('placeholder')).toBe('Test Placeholder');
  });

  test('should display error messages when the form control is invalid and touched', () => {
    component.formControl.setErrors({ required: true });
    component.formControl.markAsTouched(); 
    fixture.detectChanges();

    const errorElement: DebugElement = fixture.debugElement.query(By.css('.error__name'));
    expect(errorElement.nativeElement.textContent).toContain('This field is required');
  });
});