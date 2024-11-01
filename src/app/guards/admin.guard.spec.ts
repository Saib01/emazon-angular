import { TestBed } from '@angular/core/testing';
import { AdminGuard } from './admin.guard';
import { TokenService } from '@services/token.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('AdminGuard', () => {
  let adminGuard: AdminGuard;
  let tokenService: TokenService;
  let router: Router;

  beforeEach(() => {
    const tokenServiceMock = {
      isValidToken: jest.fn(),
      getUserRole: jest.fn()
    };

    const routerMock = {
      navigate: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        AdminGuard,
        { provide: TokenService, useValue: tokenServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    adminGuard = TestBed.inject(AdminGuard);
    tokenService = TestBed.inject(TokenService);
    router = TestBed.inject(Router);
  });

  test('should allow activation if token is valid and user has ADMIN role', () => {
    (tokenService.isValidToken as jest.Mock).mockReturnValue(true);
    (tokenService.getUserRole as jest.Mock).mockReturnValue(['ADMIN']);

    const result = adminGuard.canActivate();

    expect(result).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  test('should prevent activation and navigate to login if token is invalid', () => {
    (tokenService.isValidToken as jest.Mock).mockReturnValue(false);

    const result = adminGuard.canActivate();

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });

  test('should prevent activation and navigate to login if user does not have ADMIN role', () => {
    (tokenService.isValidToken as jest.Mock).mockReturnValue(true);
    (tokenService.getUserRole as jest.Mock).mockReturnValue(['CLIENT']);

    const result = adminGuard.canActivate();

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });
});
