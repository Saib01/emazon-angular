import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CategoryIconComponent } from "../../../../../src/app/components/atoms/icons/category-icon/category-icon.component";

describe('CategoryIconComponent', () => {
    let component: CategoryIconComponent;
    let fixture: ComponentFixture<CategoryIconComponent>;
  
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [CategoryIconComponent]
      }).compileComponents();
    });
    beforeEach(() => {
      fixture = TestBed.createComponent(CategoryIconComponent);
      component = fixture.componentInstance;
      fixture.detectChanges(); 
    });
    test('should create', () => {
      expect(component).toBeTruthy();
    });
  });
  
  