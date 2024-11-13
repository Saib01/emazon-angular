import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingCartComponent } from './shopping-cart.component';
import { ShoppingCartService } from '@services/shopping-cart.service';
import { StockService } from '@services/stock.service';
import { of } from 'rxjs';
import { BasicInfo } from '@models/basic-Info.model';
import { Page } from '@models/page.model';
import { ShoppingCartItem } from '@models/shopping-cart-item';
import { PaginationParamsComponent } from '@shared/molecules/pagination-params/pagination-params.component';
import { FilterSelectComponent } from '@shared/molecules/filter-select/filter-select.component';
import { RangePipe } from '../../pipe/range.pipe';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;
  let shoppingCartServiceMock: any;
  let stockServiceMock: any;

  beforeEach(async () => {
    shoppingCartServiceMock = {
      getShoppingCart: jest.fn().mockReturnValue(of({
        content: [{ unitsInCart: 2, price: 10,amount:10 }],
        totalElements: 1,
        totalPages: 1,
        pageNumber: 0,
        first: true,
        last: true,
        pageSize: 10,
        numberOfElements: 1,
        ascending: true,
        empty: false
      } as Page<ShoppingCartItem>)),
      getTotalProductsInShoppingCart: jest.fn().mockReturnValue(of(1))
    };

    stockServiceMock = {
      getCategories: jest.fn().mockReturnValue(of({ content: [{ id: 1, name: 'Electronics', description: '' }] } as Page<BasicInfo>)),
      getBrands: jest.fn().mockReturnValue(of({ content: [{ id: 1, name: 'Apple', description: '' }] } as Page<BasicInfo>))
    };

    await TestBed.configureTestingModule({
      declarations: [ShoppingCartComponent,PaginationParamsComponent,FilterSelectComponent,RangePipe],
      providers: [
        { provide: ShoppingCartService, useValue: shoppingCartServiceMock },
        { provide: StockService, useValue: stockServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.page).toBe(0);
    expect(component.size).toBe(5);
    expect(component.sortDirection).toBe('ASC');
    expect(component.brandName).toBe('');
    expect(component.categoryName).toBe('');
  });

  it('should fetch shopping cart data and calculate total on init', () => {
    component.ngOnInit();
    expect(shoppingCartServiceMock.getShoppingCart).toHaveBeenCalled();
    expect(component.total).toBe(20);
    expect(component.userShoppingCart.content.length).toBe(1);
  });

  it('should fetch categories on getCategories call', () => {
    component.getCategories();
    expect(stockServiceMock.getCategories).toHaveBeenCalledWith('ASC', 0, 100);
    expect(component.categoryList.length).toBeGreaterThan(1); 
  });

  it('should fetch brands on getBrands call', () => {
    component.getBrands();
    expect(stockServiceMock.getBrands).toHaveBeenCalledWith('ASC', 0, 100);
    expect(component.brandList.length).toBeGreaterThan(1); 
  });

  it('should return the correctly formatted insufficient stock message', () => {
    const messageForInsufficientStockSpy = jest.spyOn(component, 'messageForInsufficientStock');
    component.messageForInsufficientStock(1);
    expect(messageForInsufficientStockSpy).toHaveBeenCalled();
  });

  it('should return the correctly formatted insufficient stock message', () => {
    const messageForInsufficientStockSpy = jest.spyOn(component, 'messageForInsufficientStock');
    component.messageForInsufficientStock(30);
    expect(messageForInsufficientStockSpy).toHaveBeenCalled();
  });

  it('should format messages correctly', () => {
    const formattedMessage = component.formatMessage(component.TEMPLATE_NO_STOCK_ERROR, 15, 'January');
    expect(formattedMessage).toBe('Insufficient stock. The next restock will be on day 15 of January');
  });

  it('should update page and fetch shopping cart on page number change', () => {
    const getShoppingCartSpy = jest.spyOn(component, 'getShoppingCart');
    component.onPageNumberChange(1);
    expect(component.page).toBe(1);
    expect(getShoppingCartSpy).toHaveBeenCalled();
  });

  it('should update size and fetch shopping cart on page size change', () => {
    const getShoppingCartSpy = jest.spyOn(component, 'getShoppingCart');
    component.onPageSizeChange(10);
    expect(component.size).toBe(10);
    expect(getShoppingCartSpy).toHaveBeenCalled();
  });

  it('should update sortDirection and fetch shopping cart on sort direction change', () => {
    const getShoppingCartSpy = jest.spyOn(component, 'getShoppingCart');
    component.onSortDirectionChange('DESC');
    expect(component.sortDirection).toBe('DESC');
    expect(getShoppingCartSpy).toHaveBeenCalled();
  });

  it('should filter items by brand and update shopping cart', () => {
    const getShoppingCartSpy = jest.spyOn(component, 'getShoppingCart');
    component.onBrandFilterChange({ id: 1, name: 'Apple', description: '' });
    expect(component.brandName).toBe('Apple');
    expect(getShoppingCartSpy).toHaveBeenCalled();
  });

  it('should filter items by category and update shopping cart', () => {
    const getShoppingCartSpy = jest.spyOn(component, 'getShoppingCart');
    component.onCategoryFilterChange({ id: 1, name: 'Electronics', description: '' });
    expect(component.categoryName).toBe('Electronics');
    expect(getShoppingCartSpy).toHaveBeenCalled();
  });
});
