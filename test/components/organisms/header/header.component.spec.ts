import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeaderComponent } from "../../../../src/app/components/organisms/header/header.component";
import { UserIconComponent } from '../../../../src/app/components/atoms/icons/user-icon/user-icon.component';
import { Router, NavigationEnd } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { TokenService } from "@services/token.service";


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let tokenService: TokenService;
  let router: Router;

  beforeEach(() => {
    const tokenServiceSpy = { removeToken: jest.fn() };
    const routerSpy = {
      navigate: jest.fn(),
      routerState: { snapshot: { url: '/home/dashboard' } },
      events: of(new NavigationEnd(0, '/home/dashboard', '/home/dashboard'))
    };

    TestBed.configureTestingModule({
      providers: [
        HeaderComponent,
        { provide: TokenService, useValue: tokenServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    component = TestBed.inject(HeaderComponent);
    tokenService = TestBed.inject(TokenService);
    router = TestBed.inject(Router);
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
  test('should call removeToken and navigate to /login', () => {
    component.logout();

    expect(tokenService.removeToken).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});