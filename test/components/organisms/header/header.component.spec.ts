import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeaderComponent } from "../../../../src/app/components/organisms/header/header.component";
import { UserIconComponent } from '../../../../src/app/components/atoms/icons/user-icon/user-icon.component';
import { Router, NavigationEnd } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";


describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let router: Router;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [HeaderComponent,UserIconComponent],
        imports: [RouterTestingModule]
      }).compileComponents();
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      router = TestBed.inject(Router);
      fixture.detectChanges();
    });
  
    test('should create', () => {
      expect(component).toBeTruthy();
    });
  
    test('should update lastSegment when router URL changes', () => {
      const navigationEndEvent = new NavigationEnd(1, '/home', '/home');
      const spy = jest.spyOn(router.events, 'pipe').mockReturnValue(of(navigationEndEvent));
      
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
      expect(component.lastSegment).toBe('home');
    });
  
    test('should extract last segment from URL with query params', () => {
      const url = '/home/about?name=test';
      const lastSegment = component['getLastSegment'](url); 
      expect(lastSegment).toBe('about');
    });
  
    test('should extract last segment from simple URL', () => {
      const url = '/home/about';
      const lastSegment = component['getLastSegment'](url); 
      expect(lastSegment).toBe('about');
    });
  });