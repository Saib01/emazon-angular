import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationParamsComponent } from './pagination-params.component';
import { BasicInfo } from '@models/basic-Info.model';
import { RangePipe } from '../../../../../src/app/components/pipe/range.pipe';
import { FilterSelectComponent } from '../filter-select/filter-select.component';

describe('PaginationParamsComponent', () => {
  let component: PaginationParamsComponent;
  let fixture: ComponentFixture<PaginationParamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationParamsComponent,RangePipe,FilterSelectComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have totalPages as 0 by default', () => {
    expect(component.totalPages).toBe(0);
  });

  it('should have isSortByActive as false by default', () => {
    expect(component.isSortByActive).toBe(false);
  });

  it('should emit pageNumberEvent with the correct value on onPageNumberChange', () => {
    const event = { name: '3' } as BasicInfo;
    const emitSpy = jest.spyOn(component.pageNumberEvent, 'emit');
    
    component.onPageNumberChange(event);
    
    expect(emitSpy).toHaveBeenCalledWith(2);
  });

  it('should emit pageSizeEvent with the correct value on onPageSizeChange', () => {
    const event = { name: '10' } as BasicInfo;
    const emitSpy = jest.spyOn(component.pageSizeEvent, 'emit');
    
    component.onPageSizeChange(event);
    
    expect(emitSpy).toHaveBeenCalledWith(10); 
  });

  it('should emit sortDirectionEvent with the correct value on onSortDirectionChange', () => {
    const event = { name: 'ASC' } as BasicInfo;
    const emitSpy = jest.spyOn(component.sortDirectionEvent, 'emit');
    
    component.onSortDirectionChange(event);
    
    expect(emitSpy).toHaveBeenCalledWith('ASC'); 
  });
});