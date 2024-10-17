import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBrandComponent } from '../../../../../src/app/components/pages/brand/list-brand/list-brand.component';
import { StockService } from '@services/stock.service';
import { of } from 'rxjs/internal/observable/of';
import { BasicTableInfoComponent } from '../../../../../src/app/components/organisms/basic-table-info/basic-table-info.component';
import { throwError } from 'rxjs';
import { RangePipe } from '../../../../../src/app/components/pipe/range.pipe';
import { ButtonComponent } from '../../../../../src/app/components/atoms/basic-components/button/button.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ListBrandComponent', () => {
  let component: ListBrandComponent;
  let fixture: ComponentFixture<ListBrandComponent>;
  let stockServiceMock: jest.Mocked<StockService>;

  beforeEach(async () => {
    const stockMock: jest.Mocked<StockService> = {
      getBrands: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      declarations: [ListBrandComponent,BasicTableInfoComponent,RangePipe,ButtonComponent],
      providers: [
        { provide: StockService, useValue: stockMock }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    stockServiceMock = TestBed.inject(StockService) as jest.Mocked<StockService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBrandComponent);
    component = fixture.componentInstance;

    stockServiceMock.getBrands.mockReturnValue(of({
      content: [{ id: 1, name: 'Brand 1' ,description: "empty"}],
      totalElements: 1,
      totalPages: 1,
      pageNumber: 0,
      first: true,
      last: true,
      pageSize: 10,
      numberOfElements: 1,
      ascending: true,
      empty: false
    }));
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getBrands on ngOnInit', () => {
    expect(stockServiceMock.getBrands).toHaveBeenCalledWith(component.sortDirection, component.page, component.size);
  });

  it('should update pageBrand when getBrands is successful', () => {
    component.getBrands();
    fixture.detectChanges();

    expect(component.pageBrand.content.length).toBe(1);
    expect(component.pageBrand.content[0].name).toBe('Brand 1');
  });

  it('should log an error message if getBrands fails', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    stockServiceMock.getBrands.mockReturnValue(throwError(() => new Error('Error')));

    component.getBrands();
    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
  });

  it('should update page and call getBrands when onPageNumberChange is called', () => {
    const newPage = 2;
    jest.spyOn(component, 'getBrands');

    component.onPageNumberChange(newPage);
    expect(component.page).toBe(newPage);
    expect(component.getBrands).toHaveBeenCalled();
  });

  it('should update size and call getBrands when onPageSizeChange is called', () => {
    const newSize = 20;
    jest.spyOn(component, 'getBrands');

    component.onPageSizeChange(newSize);
    expect(component.size).toBe(newSize);
    expect(component.getBrands).toHaveBeenCalled();
  });

  it('should reset page to 0 if current page exceeds total pages when onPageSizeChange is called', () => {
    component.page = 5;
    component.pageBrand.totalElements = 40; 

    component.onPageSizeChange(10);
    expect(component.page).toBe(0);
  });

  it('should update sortDirection and call getBrands when onSortDirectionChange is called', () => {
    const newSortDirection = 'DESC';
    jest.spyOn(component, 'getBrands');

    component.onSortDirectionChange(newSortDirection);
    expect(component.sortDirection).toBe(newSortDirection);
    expect(component.getBrands).toHaveBeenCalled();
  });
});