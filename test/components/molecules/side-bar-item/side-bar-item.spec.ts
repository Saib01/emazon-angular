

// side-bar-item.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideBarItemComponent } from '../../../../src/app/components/molecules/sidebar-item/side-bar-item.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  template: `
    <side-bar-item
      [linkName]="linkName"
      [link]="link"
      [isClose]="isClose"
      [iconColor]="iconColor">
      <span class="icon">🌟</span>
    </side-bar-item>
  `
})
class TestHostComponent {
  linkName: string = 'home';
  link: string = '/home';
  isClose: boolean = false;
  iconColor: string = 'blue';
}

describe('SideBarItemComponent with Host', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideBarItemComponent, TestHostComponent],
      imports: [RouterTestingModule]
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  test('should create the component', () => {
    const sideBarItemDebugElement = hostFixture.debugElement.query(By.directive(SideBarItemComponent));
    expect(sideBarItemDebugElement).toBeTruthy();
  });

  test('should pass correct @Input values to side-bar-item', () => {
    const sideBarItemDebugElement = hostFixture.debugElement.query(By.directive(SideBarItemComponent));
    const sideBarItemComponent = sideBarItemDebugElement.componentInstance as SideBarItemComponent;

    expect(sideBarItemComponent.linkName).toBe('home');
    expect(sideBarItemComponent.link).toBe('/home');
    expect(sideBarItemComponent.isClose).toBe(false);
    expect(sideBarItemComponent.iconColor).toBe('blue');
  });

  test('should render the projected content', () => {
    const sideBarItemDebugElement = hostFixture.debugElement.query(By.directive(SideBarItemComponent));
    const iconElement = sideBarItemDebugElement.query(By.css('.icon'));

    expect(iconElement).toBeTruthy();
    expect(iconElement.nativeElement.textContent).toBe('🌟');
  });

  test('Should apply the hidden class when isClose is true, so the elements become hidden', () => {
    hostComponent.isClose = true;
    hostFixture.detectChanges();

    const sideBarItemDebugElement = hostFixture.debugElement.query(By.directive(SideBarItemComponent));
    const divElement = sideBarItemDebugElement.query(By.css('.item'));
    const linkElement = sideBarItemDebugElement.query(By.css('.item__link'));

    expect(divElement.classes['item--hidden']).toBe(true);
    expect(linkElement.classes['item__link--hidden']).toBe(true);

  });

  test('should display linkName with titlecase pipe', () => {
    hostComponent.linkName = 'dashboard';
    hostFixture.detectChanges();

    const sideBarItemDebugElement = hostFixture.debugElement.query(By.directive(SideBarItemComponent));
    const spanElement = sideBarItemDebugElement.query(By.css('.item__text span'));

    expect(spanElement.nativeElement.textContent).toBe('Dashboard');
  });

  test('should navigate to the correct link when clicked', () => {
    const sideBarItemDebugElement = hostFixture.debugElement.query(By.directive(SideBarItemComponent));
    const anchorElement = sideBarItemDebugElement.query(By.css('a')).nativeElement;

    expect(anchorElement.getAttribute('href')).toBe('/home');
  });
});
