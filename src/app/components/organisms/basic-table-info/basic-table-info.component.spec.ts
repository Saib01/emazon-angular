import {ComponentFixture, TestBed } from '@angular/core/testing';
import { BasicTableInfoComponent } from './basic-table-info.component';
import { BasicInfo } from '@models/basic-Info.model';
import { RangePipe } from '../../pipe/range.pipe';
import { ButtonComponent } from '../../../shared/atoms/button/button.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BasicTableInfoComponent', () => {
  let component: BasicTableInfoComponent;
  let fixture: ComponentFixture<BasicTableInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasicTableInfoComponent,RangePipe,ButtonComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicTableInfoComponent);
    component = fixture.componentInstance;
    component.sortByOptions=['product','category'];
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should emit pageNumberEvent when onPageNumberChange is called', () => {
    jest.spyOn(component.pageNumberEvent, 'emit');
    const mockEvent =2;

    component.onPageNumberChange(mockEvent);

    expect(component.pageNumberEvent.emit).toHaveBeenCalledWith(2);
  });

  test('should emit pageSizeEvent when onPageSizeChange is called', () => {
    jest.spyOn(component.pageSizeEvent, 'emit');
    const mockEvent = 20;

    component.onPageSizeChange(mockEvent);

    expect(component.pageSizeEvent.emit).toHaveBeenCalledWith(20);
  });

  test('should emit sortDirectionEvent  when onSortDirectionChange is called', () => {
    jest.spyOn(component.sortDirectionEvent, 'emit');
    const mockEvent = 'asc' ;

    component.onSortDirectionChange(mockEvent);

    expect(component.sortDirectionEvent.emit).toHaveBeenCalledWith('asc');
  });

  test('should emit sortByChangeEvent when onSortByChange is called', () => {
    jest.spyOn(component.sortByEvent, 'emit');
    const mockEvent = { name: 'product' } ;

    component.onSortByChange(mockEvent);

    expect(component.sortByEvent.emit).toHaveBeenCalledWith('product');
  });

  test('should have default totalPages as 0', () => {
    expect(component.totalPages).toBe(0);
  });

  test('should have an empty elements array by default', () => {
    expect(component.elements).toEqual([]);
  });

  test('should update totalPages input property', () => {
    component.totalPages = 5;
    fixture.detectChanges();

    expect(component.totalPages).toBe(5);
  });

  test('should update elements input property', () => {
    const mockElements: BasicInfo[] = [
      { id: 1, name: 'category 1', description:'empty' },
      { id: 2, name: 'Element 2', description:'empty' }
    ];
    component.elements = mockElements;
    fixture.detectChanges();

    expect(component.elements).toBe(mockElements);
  });

  test('should return true when item has amount property', () => {
    const productItem = { id: 1, name: 'Sample Product', amount: 10 };
    expect(component.isProduct(productItem)).toBe(true);
  });

  test('should return false when item does not have amount property', () => {
    const basicInfoItem = { id: 1, name: 'Sample Basic Info' };
    expect(component.isProduct(basicInfoItem)).toBe(false);
  });
});
