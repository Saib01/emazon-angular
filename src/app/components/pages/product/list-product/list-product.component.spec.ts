import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListProductComponent } from './list-product.component';
import { StockService } from '@services/stock.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Page } from '@models/page.model';
import { Product } from '@models/product.model';
import { RangePipe } from '../../../pipe/range.pipe';
import { ButtonComponent } from '../../../../shared/atoms/button/button.component';
import { BasicTableInfoComponent } from '../../../organisms/basic-table-info/basic-table-info.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('ListProductComponent', () => {
  let component: ListProductComponent;
  let fixture: ComponentFixture<ListProductComponent>;
  let stockService: jest.Mocked<StockService>;

  const mockPageProduct: Page<Product> = {
    content: [{ id: 1, name: 'Product A' ,description:'description',amount:5,price:5,brandResponse:{id:2,name:'A'},categoryResponseList:[{id:1,name:'A'},{id:2,name:'B'}]}], 
    totalElements: 1,
    totalPages: 1,
    pageNumber: 0,
    first: true,
    last: true,
    pageSize: 5,
    numberOfElements: 1,
    ascending: true,
    empty: false
  };

  beforeEach(async () => {
    const stockSpy = {
      getProducts: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [ListProductComponent,RangePipe,ButtonComponent,BasicTableInfoComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: StockService, useValue: stockSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ListProductComponent);
    component = fixture.componentInstance;
    stockService = TestBed.inject(StockService) as jest.Mocked<StockService>;
    stockService.getProducts.mockReturnValue(of(mockPageProduct));
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  test('should call getProducts on ngOnInit', () => {
    const getProductsSpy = jest.spyOn(component, 'getProducts');
    fixture.detectChanges();

    expect(getProductsSpy).toHaveBeenCalled();
  });

  test('should populate pageProduct when getProducts is called', () => {
    component.getProducts();

    expect(component.pageProduct).toEqual(mockPageProduct);
    expect(stockService.getProducts).toHaveBeenCalledWith('ASC', 0, 5, 'productName');
  });

  test('should handle error when getProducts fails', () => {
    const errorResponse = new Error('Service error');
    stockService.getProducts.mockReturnValue(throwError(() => errorResponse));
    jest.spyOn(console, 'log').mockImplementation(() => {});

    component.getProducts();

    expect(console.log).toHaveBeenCalledWith(errorResponse);
  });

  test('should update the page size and call getProducts when onPageSizeChange is triggered', () => {
    component.onPageSizeChange(10);

    expect(component.size).toBe(10);
    expect(stockService.getProducts).toHaveBeenCalled();
  });

  test('should update sort direction and call getProducts when onSortDirectionChange is triggered', () => {
    component.onSortDirectionChange('DESC');

    expect(component.sortDirection).toBe('DESC');
    expect(stockService.getProducts).toHaveBeenCalled();
  });

  test('should update page number and call getProducts when onPageNumberChange is triggered', () => {
    component.onPageNumberChange(2);

    expect(component.page).toBe(2);
    expect(stockService.getProducts).toHaveBeenCalled();
  });

  test('should update sortBy and call getProducts when onSortByChange is triggered', () => {
    component.onSortByChange('category');

    expect(component.sortBy).toBe('categoryName');
    expect(stockService.getProducts).toHaveBeenCalled();
  });
  test('should reset page to 0 if current page exceeds total pages when onPageSizeChange is called', () => {
    component.page = 5;
    component.onPageSizeChange(10);
    expect(component.page).toBe(0);
  });
});