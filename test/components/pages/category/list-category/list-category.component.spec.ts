import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListCategoryComponent } from '../../../../../src/app/components/pages/category/list-category/list-category.component';
import { StockService } from '@services/stock.service';
import { Observable, of, throwError } from 'rxjs';
import { Page } from '@models/page.model';
import { BasicInfo } from '@models/BasicInfo.model';
import { RangePipe } from '../../../../../src/app/components/pipe/range.pipe';
import { ButtonComponent } from '../../../../../src/app/components/atoms/basic-components/button/button.component';
import { ActivatedRoute} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BasicTableInfoComponent } from '../../../../../src/app/components/organisms/basic-table-info/basic-table-info.component';


class MockStockService{
  private readonly API_STOCK = 'http://mockapi.com/api/category/'; 
  getCategories(sortDirection: string, page: number, size: number) : Observable<Page<BasicInfo>>{

    return of({
      content: [{ id: 1, name: 'Category 1' , description:"test"}],
      totalElements: 1,
      totalPages: 1,
      pageNumber: 1,
      first: true,
      last: true,
      pageSize: 10,
      numberOfElements: 1,
      ascending: false,
      empty: false
    }); 
  }
}


describe('ListCategoryComponent', () => {
  let component: ListCategoryComponent;
  let fixture: ComponentFixture<ListCategoryComponent>;
  let stockServiceMock: MockStockService;
  
  const mockPage: Page<BasicInfo> = {
    content: [{ id: 1, name: 'Category 1' , description:"test"}],
    totalElements: 1,
    totalPages: 1,
    pageNumber: 1,
    first: true,
    last: true,
    pageSize: 10,
    numberOfElements: 1,
    ascending: false,
    empty: false
  };

  beforeEach(async () => {
    stockServiceMock = new MockStockService();
    await TestBed.configureTestingModule({
      declarations: [ListCategoryComponent,RangePipe,ButtonComponent,BasicTableInfoComponent],
      imports: [HttpClientTestingModule,RouterTestingModule],
      providers: [
        { provide: StockService, useValue: stockServiceMock },
      //  {provide:Router,useValue:{navigate:jest.fn()}}
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            root: {                routeConfig: {
              path: 'panel/category', // Simulación de la ruta actual
            }
          }, 
            paramMap: {
              get: () => '1', // Mock de método get de paramMap
            },
          },
        },
      },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCategoryComponent);
    component = fixture.componentInstance;

    jest.spyOn(stockServiceMock, 'getCategories').mockReturnValueOnce(of(mockPage));
    fixture.detectChanges();
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  test('should initialize with categories data', () => {
    component.ngOnInit();
    expect(stockServiceMock.getCategories).toHaveBeenCalledWith('ASC', 0, 5);
    expect(component.pageCategory).toEqual(mockPage);
  });

  test('should handle page number change and fetch new data', () => {
    component.onPageNumberChange(1);
    expect(component.page).toBe(1);
    expect(stockServiceMock.getCategories).toHaveBeenCalledWith('ASC', 1, 5);
  });

  test('should handle page size change and fetch new data', () => {
    component.page=1;
    component.onPageSizeChange(20);
    expect(component.size).toBe(20);
    expect(component.page).toBe(0);
    expect(stockServiceMock.getCategories).toHaveBeenCalledWith('ASC', 0, 20);
  });
  test('should handle page size change and fetch new data', () => {
    component.onPageSizeChange(20);
    expect(component.size).toBe(20);
    expect(component.page).toBe(0);
    expect(stockServiceMock.getCategories).toHaveBeenCalledWith('ASC', 0, 20);
  });
  test('should handle sort direction change and fetch new data', () => {
    component.onSortDirectionChange('DESC');
    expect(component.sortDirection).toBe('DESC');
    expect(stockServiceMock.getCategories).toHaveBeenCalledWith('DESC', 0, 5);
  });

  test('should handle error when fetching categories', () => {
    const spy  = jest.spyOn(stockServiceMock, 'getCategories').mockReturnValueOnce(throwError(() => new Error('Communication Error')));
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    fixture.detectChanges();
    component.getCategories();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
    consoleSpy.mockRestore();
  });
});
