import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StockService } from '@services/stock.service';
import { BasicInfo } from '@models/BasicInfo.model'; 
import { environment } from '@environments/environment';
import { HttpParams } from '@angular/common/http';
import { Page } from '@models/page.model';

describe('StockService', () => {
  let service: StockService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [StockService],
    });

    service = TestBed.inject(StockService); 
    httpMock = TestBed.inject(HttpTestingController); 
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should create a category', () => {
    const category: BasicInfo = {
        name: 'Test Category',
        description: ''
    }; 

    service.createCategory(category).subscribe((response) => {
      expect(response).toEqual(category); 
    });

    const req = httpMock.expectOne(`${environment.API_URL_STOCK}/api/category/`);
    expect(req.request.method).toBe('POST'); 
    req.flush(category);
  });

  test('should check if the category name is valid', () => {
    const name = 'Valid Name';
    const isValid = true;

    service.checkCategoryName(name).subscribe((response) => {
      expect(response).toBe(isValid);
    });

    const req = httpMock.expectOne(`${environment.API_URL_STOCK}/api/category/validate-name`);
    expect(req.request.method).toBe('POST'); 
    req.flush(isValid); 
  });

  test('should retrieve categories with correct query parameters', () => {
    const mockResponse: Page<BasicInfo> = {
      content: [{ id: 1, name: 'Category 1',description:"asd" }, { id: 2, name: 'Category 2',description:" " }],
      totalElements: 0,
      totalPages: 0,
      pageNumber: 0,
      first: true,
      last: true,
      pageSize: 10,
      numberOfElements: 0,
      ascending: false,
      empty: true
    };

    const sortDirection = 'ASC';
    const page = 0;
    const size = 10;

    service.getCategories(sortDirection, page, size).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.API_URL_STOCK}/api/category?sortDirection=${sortDirection}&page=${page}&size=${size}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
