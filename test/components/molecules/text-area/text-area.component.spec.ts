import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from "@angular/forms";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { ControlErrorComponent } from "../../../../src/app/components/molecules/control-error/control-error.component";
import { TextAreaComponent } from "../../../../src/app/components/molecules/text-area/text-area.component";

describe('TextAreaComponent', () => {
  let component: TextAreaComponent;
  let fixture: ComponentFixture<TextAreaComponent>;

  beforeEach(async () => {
    const formGroup = new FormGroup({
      testControl: new FormControl(''),
    });

    await TestBed.configureTestingModule({
      declarations: [TextAreaComponent,ControlErrorComponent],
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
    fixture = TestBed.createComponent(TextAreaComponent);
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

  test('should render the textarea with the correct placeholder', () => {
    const inputElement: DebugElement = fixture.debugElement.query(By.css('textarea'));
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