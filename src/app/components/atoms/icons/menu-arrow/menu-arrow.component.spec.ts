import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MenuArrowComponent } from "./menu-arrow.component";

describe('MenuArrowComponent', () => {
    let component: MenuArrowComponent;
    let fixture: ComponentFixture<MenuArrowComponent>;
  
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [MenuArrowComponent]
      }).compileComponents();
    });
    beforeEach(() => {
      fixture = TestBed.createComponent(MenuArrowComponent);
      component = fixture.componentInstance;
      fixture.detectChanges(); 
    });
    test('should create', () => {
      expect(component).toBeTruthy();
    });
  });
  
  