import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeaderComponent } from "./header.component";
import { Router, NavigationEnd } from "@angular/router";
import { of } from "rxjs";


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(() => {
    const routerSpy = {
      navigate: jest.fn(),
      routerState: { snapshot: { url: '/home/dashboard' } },
      events: of(new NavigationEnd(0, '/home/dashboard', '/home/dashboard'))
    };

    TestBed.configureTestingModule({
      providers: [
        HeaderComponent,
        { provide: Router, useValue: routerSpy }
      ]
    });

    component = TestBed.inject(HeaderComponent);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should update lastSegment when router URL changes', () => {
    component.ngOnInit();
    expect(component.lastSegmentUrl).toBe('dashboard');
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

  test('should extract last segment from another simple URL', () => {
    const url = '/panel/category/create?';
    const lastSegment = component['getLastSegment'](url);
    expect(lastSegment).toBe('category');
  });
  test('should extract last segment from another simple URL', () => {
    const url = '/panel/category?';
    const lastSegment = component['getLastSegment'](url);
    expect(lastSegment).toBe('category');
  });

});