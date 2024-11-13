import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingCartIconComponent } from './shopping-cart-icon.component';
import { ShoppingCartService } from '@services/shopping-cart.service';
import { of } from 'rxjs';

describe('ShoppingCartIconComponent', () => {
  let component: ShoppingCartIconComponent;
  let fixture: ComponentFixture<ShoppingCartIconComponent>;
  let shoppingCartServiceMock: Partial<ShoppingCartService>;

  beforeEach(async () => {
    shoppingCartServiceMock = {
      getTotalProductsInShoppingCart: jest.fn().mockReturnValue(of(5)),
    } ;

    await TestBed.configureTestingModule({
      declarations: [ShoppingCartIconComponent],
      providers: [
        { provide: ShoppingCartService, useValue: shoppingCartServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  test('should initialize svgFill with default value', () => {
    expect(component.svgFill).toBe('currentColor');
  });

  test('should initialize svgClass with an empty array', () => {
    expect(component.svgClass).toEqual([]);
  });

  test('should call getTotalProductsInShoppingCart on ngOnInit', () => {
    expect(shoppingCartServiceMock.getTotalProductsInShoppingCart).toHaveBeenCalled();
  });

  test('should set the total to the value returned by the service', () => {
    expect(component.total).toBe(5);
  });


});
