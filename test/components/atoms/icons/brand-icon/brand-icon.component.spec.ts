/* tslint:disable:no-unused-variable */
import {ComponentFixture, TestBed } from '@angular/core/testing';


import { BrandIconComponent } from '../../../../../src/app/components/atoms/icons/brand-icon/brand-icon.component';

describe('BrandIconComponent', () => {
  let component: BrandIconComponent;
  let fixture: ComponentFixture<BrandIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
