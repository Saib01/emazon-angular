/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BrandIconComponent } from './brand-icon.component';

describe('BrandIconComponent', () => {
  let component: BrandIconComponent;
  let fixture: ComponentFixture<BrandIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
