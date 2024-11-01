import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TokenService } from '@services/token.service';
import { LoginGuard } from './login.guard';

describe('LoginGuard', () => {
  let loginGuard: LoginGuard;
  let tokenService: TokenService;
  let router: Router;

  beforeEach(() => {
    const tokenServiceMock = {
      isValidToken: jest.fn()
    };

    const routerMock = {
      navigate: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        LoginGuard,
        { provide: TokenService, useValue: tokenServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    loginGuard = TestBed.inject(LoginGuard);
    tokenService = TestBed.inject(TokenService);
    router = TestBed.inject(Router);
  });

  it('should navigate to "panel/home" if token is valid', () => {
    (tokenService.isValidToken as jest.Mock).mockReturnValue(true);

    const result = loginGuard.canActivate();

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['panel/home']);
  });

  it('should return true if token is invalid', () => {
    (tokenService.isValidToken as jest.Mock).mockReturnValue(false);

    const result = loginGuard.canActivate();

    expect(result).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
