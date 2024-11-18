import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StockService } from '@services/stock.service';
import { BasicInfo } from '@models/basic-Info.model'; 
import { environment } from '@environments/environment';
import { Page } from '@models/page.model';
import { Product, ProductRequest } from '@models/product.model';

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


  
  test('should create a brand', () => {
    const brand: BasicInfo = {
        name: 'Test Brand',
        description: ''
    }; 

    service.createBrand(brand).subscribe((response) => {
      expect(response).toEqual(brand); 
    });

    const req = httpMock.expectOne(`${environment.API_URL_STOCK}/api/brand/`);
    expect(req.request.method).toBe('POST'); 
    req.flush(brand);
  });

  test('should check if the brand name is valid', () => {
    const name = 'Valid Name';
    const isValid = true;

    service.checkBrandName(name).subscribe((response) => {
      expect(response).toBe(isValid);
    });

    const req = httpMock.expectOne(`${environment.API_URL_STOCK}/api/brand/validate-name`);
    expect(req.request.method).toBe('POST'); 
    req.flush(isValid); 
  });
  
  test('should retrieve brands with correct query parameters', () => {
    const mockResponse: Page<BasicInfo> = {
      content: [{ id: 1, name: 'Brand 1',description:"asd" }, { id: 2, name: 'Brand 2',description:" " }],
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

    service.getBrands(sortDirection, page, size).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.API_URL_STOCK}/api/brand?sortDirection=${sortDirection}&page=${page}&size=${size}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
});


test('should create a product', () => {
  const product: ProductRequest = {
    name: 'product',
    description: 'product description',
   amount: 15,
    price: 10,
    brandId: 2,
    categoryIdsList:[5,5,5]
  };
  service.createProduct(product).subscribe((response) => {
    expect(response).toEqual(product); 
  });

  const req = httpMock.expectOne(`${environment.API_URL_STOCK}/api/product/`);
  expect(req.request.method).toBe('POST'); 
  req.flush(product);
});

test('should check if the product name is valid', () => {
  const name = 'Valid Name';
  const isValid = true;

  service.checkProductName(name).subscribe((response) => {
    expect(response).toBe(isValid);
  });

  const req = httpMock.expectOne(`${environment.API_URL_STOCK}/api/product/validate-name`);
  expect(req.request.method).toBe('POST'); 
  req.flush(isValid); 
});

test('should retrieve products with correct query parameters', () => {
  const mockResponse: Page<Product> = {
    content: [{ 
      id: 1, 
      name: 'Brand 1',
      description:'asd',
      amount:5, 
      price:5000, 
      brandResponse:{ id: 1, name: 'Brand 1',description:"asd" },
      categoryResponseList:[{ id: 1, name: 'Category 1',description:"asd" }]
    }],
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
  const sortBy='productName';

  service.getProducts(sortDirection, page, size,sortBy).subscribe(response => {
    expect(response).toEqual(mockResponse);
  });

  const req = httpMock.expectOne(`${environment.API_URL_STOCK}/api/product?sortDirection=${sortDirection}&page=${page}&size=${size}&sortBy=${sortBy}`);
  expect(req.request.method).toBe('GET');
  req.flush(mockResponse);
});

test('should fetch the product from API', () => {
  const productId = 1;
  const mockProduct: Product ={ 
    id: 1, 
    name: 'Brand 1',
    description:'asd',
    amount:5, 
    price:5000, 
    brandResponse:{ id: 1, name: 'Brand 1',description:"asd" },
    categoryResponseList:[{ id: 1, name: 'Category 1',description:"asd" }]
  };

  service.getProduct(productId).subscribe((product) => {
    expect(product).toEqual(mockProduct);
  });

  const req = httpMock.expectOne(`${environment.API_URL_STOCK}/api/product/${productId}`);
  expect(req.request.method).toBe('GET');
  req.flush(mockProduct); 
});
});
