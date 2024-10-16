/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BasicTableInfoComponent } from './basic-table-info.component';
import { RangePipe } from '../../pipe/range.pipe';
import { ButtonComponent } from '../../atoms/basic-components/button/button.component';
import { RouterLink } from '@angular/router';

describe('BasicTableInfoComponent', () => {
  let component: BasicTableInfoComponent;
  let fixture: ComponentFixture<BasicTableInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicTableInfoComponent,RangePipe,ButtonComponent,RouterLink ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicTableInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
