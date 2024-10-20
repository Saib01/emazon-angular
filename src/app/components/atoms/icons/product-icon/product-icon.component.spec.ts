import { ComponentFixture, TestBed } from '@angular/core/testing';


import { ProductIconComponent } from './product-icon.component';

describe('ProductIconComponent', () => {
  let component: ProductIconComponent;
  let fixture: ComponentFixture<ProductIconComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ ProductIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
