import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomeIconComponent } from "../../../../../src/app/components/atoms/icons/home-icon/home-icon.component";
describe('HomeIconComponent', () => {
    let component: HomeIconComponent;
    let fixture: ComponentFixture<HomeIconComponent>;
  
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [HomeIconComponent]
      }).compileComponents();
    });
    beforeEach(() => {
      fixture = TestBed.createComponent(HomeIconComponent);
      component = fixture.componentInstance;
      fixture.detectChanges(); 
    });
    test('should create', () => {
      expect(component).toBeTruthy();
    });
  });
  
  