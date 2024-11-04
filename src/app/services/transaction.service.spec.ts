import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TransactionService } from './transaction.service';
import { SupplyRequest } from '@models/supply-request.model';

describe('TransactionService', () => {
  let transactionService: TransactionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransactionService]
    });

    transactionService = TestBed.inject(TransactionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


  test('should send a PUT request with the supply request and return the updated supply', () => {
    const supplyRequest: SupplyRequest = {
      idProduct: 0,
      amount: 0
    };

    transactionService.addProductSupply(supplyRequest).subscribe(response => {
      expect(response).toEqual({
        idProduct: 0,
        amount: 0
      });
    });

    const req = httpMock.expectOne(`${transactionService.API_TRANSACTION}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(supplyRequest);
    req.flush({
      idProduct: 0,
      amount: 0
    });
  });
});