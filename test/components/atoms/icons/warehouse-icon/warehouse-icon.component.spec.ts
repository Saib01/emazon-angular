
import {ComponentFixture, TestBed } from '@angular/core/testing';


import { WarehouseIconComponent } from '../../../../../src/app/components/atoms/icons/warehouse-icon/warehouse-icon.component';

describe('WarehouseIconComponent', () => {
  let component: WarehouseIconComponent;
  let fixture: ComponentFixture<WarehouseIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
