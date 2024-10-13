import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LogoEmazonComponent } from "../../../../../src/app/components/atoms/logo-emazon/logo-emazon.component";

describe('LogoEmazonComponent', () => {
    let component: LogoEmazonComponent;
    let fixture: ComponentFixture<LogoEmazonComponent>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [LogoEmazonComponent]
      }).compileComponents();
    });
    beforeEach(() => {
      fixture = TestBed.createComponent(LogoEmazonComponent);
      component = fixture.componentInstance;
      fixture.detectChanges(); 
    });
    test('should create', () => {
      expect(component).toBeTruthy();
    });
  });
  
  