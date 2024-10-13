import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StockService } from '@services/stock.service';
import { Category } from '@models/category.model'; 
import { environment } from '@environments/environment';

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
    const category: Category = {
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

  test('should check if the name is valid', () => {
    const name = 'Valid Name';
    const isValid = true;

    service.checkCategoryName(name).subscribe((response) => {
      expect(response).toBe(isValid); // Verificamos que la respuesta sea la esperada
    });

    const req = httpMock.expectOne(`${environment.API_URL_STOCK}/api/category/validate-name`);
    expect(req.request.method).toBe('POST'); 
    req.flush(isValid); 
  });
});
