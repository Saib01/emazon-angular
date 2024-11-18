import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingCartComponent } from './shopping-cart.component';
import { ShoppingCartService } from '@services/shopping-cart.service';
import { StockService } from '@services/stock.service';
import { of, throwError } from 'rxjs';
import { BasicInfo } from '@models/basic-Info.model';
import { Page } from '@models/page.model';
import { ShoppingCartItem } from '@models/shopping-cart-item';
import { PaginationParamsComponent } from '@shared/molecules/pagination-params/pagination-params.component';
import { FilterSelectComponent } from '@shared/molecules/filter-select/filter-select.component';
import { RangePipe } from '../../pipe/range.pipe';
import { ButtonComponent } from '@shared/atoms/button/button.component';
import { TEMPLATE_NO_STOCK_ERROR } from '@shared/constants/product.constants';
import { StatusResponseComponent } from '@shared/molecules/status-response/status-response.component';
import { AlertMessageComponent } from '@shared/molecules/alert-message/alert-message.component';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;
  let shoppingCartServiceMock: any;
  let stockServiceMock: any;
  const shoppingCartItem:ShoppingCartItem = {
    id:1,
    name:'product',
    price:20,
    unitsInCart:1,
    amount:1,
    brandResponse:{ id: 1, name: 'Category 1',description:"asd" },
    categoryResponseList:[{ id: 1, name: 'Category 1',description:"asd" },{ id: 1, name: 'Category 1',description:"asd" }],
  };
  beforeEach(async () => {
    shoppingCartServiceMock = {
      getShoppingCart: jest.fn().mockReturnValue(of({
        content: [shoppingCartItem],
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
      getTotalProductsInShoppingCart: jest.fn().mockReturnValue(of(1)),
      removeFromShoppingCart: jest.fn().mockReturnValue(of(''))
    };

    stockServiceMock = {
      getCategories: jest.fn().mockReturnValue(of({ content: [{ id: 1, name: 'Electronics', description: '' }] } as Page<BasicInfo>)),
      getBrands: jest.fn().mockReturnValue(of({ content: [{ id: 1, name: 'Apple', description: '' }] } as Page<BasicInfo>))
    };

    await TestBed.configureTestingModule({
      declarations: [ShoppingCartComponent,PaginationParamsComponent,FilterSelectComponent,RangePipe,ButtonComponent,StatusResponseComponent,AlertMessageComponent],
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

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  test('should initialize with default values', () => {
    expect(component.page).toBe(0);
    expect(component.size).toBe(5);
    expect(component.sortDirection).toBe('ASC');
    expect(component.brandName).toBe('');
    expect(component.categoryName).toBe('');
  });

  test('should fetch shopping cart data and calculate total on init', () => {
    component.ngOnInit();
    expect(shoppingCartServiceMock.getShoppingCart).toHaveBeenCalled();
    expect(component.total).toBe(20);
    expect(component.userShoppingCart.content.length).toBe(1);
  });

  test('should fetch categories on getCategories call', () => {
    component.getCategories();
    expect(stockServiceMock.getCategories).toHaveBeenCalledWith('ASC', 0, 100);
    expect(component.categoryList.length).toBeGreaterThan(1); 
  });

  test('should fetch brands on getBrands call', () => {
    component.getBrands();
    expect(stockServiceMock.getBrands).toHaveBeenCalledWith('ASC', 0, 100);
    expect(component.brandList.length).toBeGreaterThan(1); 
  });

  it('should return the correctly formatted insufficient stock message', () => {
    const messageForInsufficientStockSpy = jest.spyOn(component, 'messageForInsufficientStock');
    component.messageForInsufficientStock(1);
    expect(messageForInsufficientStockSpy).toHaveBeenCalled();
  });

  test('should return the correctly formatted insufficient stock message', () => {
    const messageForInsufficientStockSpy = jest.spyOn(component, 'messageForInsufficientStock');
    component.messageForInsufficientStock(30);
    expect(messageForInsufficientStockSpy).toHaveBeenCalled();
  });

  test('should format messages correctly', () => {
    const formattedMessage = component.formatMessage(TEMPLATE_NO_STOCK_ERROR, 15, 'January');
    expect(formattedMessage).toBe('Insufficient stock. The next restock will be on day 15 of January');
  });

  test('should update page and fetch shopping cart on page number change', () => {
    const getShoppingCartSpy = jest.spyOn(component, 'getShoppingCart');
    component.onPageNumberChange(1);
    expect(component.page).toBe(1);
    expect(getShoppingCartSpy).toHaveBeenCalled();
  });

  test('should update size and fetch shopping cart on page size change', () => {
    const getShoppingCartSpy = jest.spyOn(component, 'getShoppingCart');
    component.onPageSizeChange(10);
    expect(component.size).toBe(10);
    expect(getShoppingCartSpy).toHaveBeenCalled();
  });

  test('should update sortDirection and fetch shopping cart on sort direction change', () => {
    const getShoppingCartSpy = jest.spyOn(component, 'getShoppingCart');
    component.onSortDirectionChange('DESC');
    expect(component.sortDirection).toBe('DESC');
    expect(getShoppingCartSpy).toHaveBeenCalled();
  });

  test('should filter items by brand and update shopping cart', () => {
    const getShoppingCartSpy = jest.spyOn(component, 'getShoppingCart');
    component.onBrandFilterChange({ id: 1, name: 'Apple', description: '' });
    expect(component.brandName).toBe('Apple');
    expect(getShoppingCartSpy).toHaveBeenCalled();
  });

  test('should filter items by category and update shopping cart', () => {
    const getShoppingCartSpy = jest.spyOn(component, 'getShoppingCart');
    component.onCategoryFilterChange({ id: 1, name: 'Electronics', description: '' });
    expect(component.categoryName).toBe('Electronics');
    expect(getShoppingCartSpy).toHaveBeenCalled();
  });

  test('should filter items by brand and update shopping cart without filter', () => {
    const getShoppingCartSpy = jest.spyOn(component, 'getShoppingCart');
    component.onBrandFilterChange({ id: 1, name: 'none', description: '' });
    expect(component.brandName).toBe('');
    expect(getShoppingCartSpy).toHaveBeenCalled();
  });

  test('should filter items by category and update shopping cart', () => {
    const getShoppingCartSpy = jest.spyOn(component, 'getShoppingCart');
    component.onCategoryFilterChange({ id: 1, name: 'none', description: '' });
    expect(component.categoryName).toBe('');
    expect(getShoppingCartSpy).toHaveBeenCalled();
  });

  test('should remove product and update the total when successful', () => {
    component.itemToRemove=shoppingCartItem; 
    component.removeProduct();
    expect(component.userShoppingCart.content.length).toBe(0);
  });
  test('should handle error when product removal fails', () => {
    const mockError = { status: 0 };
    shoppingCartServiceMock.removeFromShoppingCart.mockReturnValue(throwError(() =>mockError));
    component.itemToRemove=shoppingCartItem; 
    component.removeProduct();
    expect(component.status.code).toBe(0);
  });
  test('should set itemToRemove when called with an item', () => {

    component.setIsRemoveAlertActive(true,shoppingCartItem);
    
    expect(component.itemToRemove).toBe(shoppingCartItem);
    expect(component.isRemoveAlertActive).toBeTruthy();
  });

});
