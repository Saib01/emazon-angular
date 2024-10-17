/* tslint:disable:no-unused-variable */
import {ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicTableInfoComponent } from './basic-table-info.component';
import { BasicInfo } from '@models/BasicInfo.model';
import { RangePipe } from '../../pipe/range.pipe';
import { ButtonComponent } from '../../atoms/basic-components/button/button.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BasicTableInfoComponent', () => {
  let component: BasicTableInfoComponent;
  let fixture: ComponentFixture<BasicTableInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasicTableInfoComponent,RangePipe,ButtonComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicTableInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit pageNumberEvent when onPageNumberChange is called', () => {
    jest.spyOn(component.pageNumberEvent, 'emit');
    const mockEvent = { target: { value: '2' } } as unknown as Event;

    component.onPageNumberChange(mockEvent);

    expect(component.pageNumberEvent.emit).toHaveBeenCalledWith(2);
  });

  it('should emit pageSizeEvent when onPageSizeChange is called', () => {
    jest.spyOn(component.pageSizeEvent, 'emit');
    const mockEvent = { target: { value: '20' } } as unknown as Event;

    component.onPageSizeChange(mockEvent);

    expect(component.pageSizeEvent.emit).toHaveBeenCalledWith(20);
  });

  it('should emit sortDirectionEvent when onSortDirectionChange is called', () => {
    jest.spyOn(component.sortDirectionEvent, 'emit');
    const mockEvent = { target: { value: 'asc' } } as unknown as Event;

    component.onSortDirectionChange(mockEvent);

    expect(component.sortDirectionEvent.emit).toHaveBeenCalledWith('asc');
  });

  it('should have default totalPages as 0', () => {
    expect(component.totalPages).toBe(0);
  });

  it('should have an empty elements array by default', () => {
    expect(component.elements).toEqual([]);
  });

  it('should update totalPages input property', () => {
    component.totalPages = 5;
    fixture.detectChanges();

    expect(component.totalPages).toBe(5);
  });

  it('should update elements input property', () => {
    const mockElements: BasicInfo[] = [
      { id: 1, name: 'category 1', description:'empty' },
      { id: 2, name: 'Element 2', description:'empty' }
    ];
    component.elements = mockElements;
    fixture.detectChanges();

    expect(component.elements).toBe(mockElements);
  });
});
