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
    // Obtiene el componente hijo desde el DOM
    const buttonDebugElement = fixture.debugElement.query(By.directive(ButtonComponent));
    const buttonComponent = buttonDebugElement.componentInstance as ButtonComponent;//componente hijo
    const buttonElement: HTMLButtonElement = buttonDebugElement.nativeElement;//Elemento boton

    // Verifica que los valores pasados al hijo son correctos
    expect(buttonComponent).toBeTruthy();
    expect(buttonComponent.typeBtn).toBe('button');
    expect(buttonComponent.isDisabled).toBe(false);

    // Cambia los valores en el host component
    component.typeBtn = 'submit';
    component.isDisabled = true;
    fixture.detectChanges(); // Refleja los cambios en el DOM

    // Verifica que los nuevos valores han sido actualizados en el componente hijo
    expect(buttonComponent.typeBtn).toBe('submit');
    expect(buttonComponent.isDisabled).toBe(true);
    expect(buttonElement.textContent).toContain('Click Me');
  });
});
