import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from '../../../../../src/app/components/atoms/basic-components/button/button.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({
  template: `<app-button [typeBtn]="typeBtn" [isDisabled]="isDisabled">{{buttonText}}</app-button>`
})
class TestHostComponent {
  typeBtn: 'button' | 'submit' | 'reset' = 'button';
  buttonText = 'Click Me';
  isDisabled: boolean=false;
}

describe('ButtonComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent, TestHostComponent]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });
  test('should render a button with default properties', () => {
    const fixtureButton=TestBed.createComponent(ButtonComponent);
    fixture.detectChanges(); 
    const buttonElement: HTMLButtonElement = fixtureButton.nativeElement.querySelector('button');
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.type).toBe('submit'); 
    expect(buttonElement.disabled).toBe(false);
    expect(buttonElement.textContent).toBe(''); 
  });

  test('should pass correct @Input values from parent to child', () => {
    const buttonDebugElement = fixture.debugElement.query(By.directive(ButtonComponent));
    const buttonComponent = buttonDebugElement.componentInstance as ButtonComponent;
    const buttonElement: HTMLButtonElement = buttonDebugElement.nativeElement;

    expect(buttonComponent).toBeTruthy();
    expect(buttonComponent.typeBtn).toBe('button');
    expect(buttonComponent.isDisabled).toBe(false);

    component.typeBtn = 'submit';
    component.isDisabled = true;
    fixture.detectChanges(); 

    expect(buttonComponent.typeBtn).toBe('submit');
    expect(buttonComponent.isDisabled).toBe(true);
    expect(buttonElement.textContent).toContain('Click Me');
  });
});
