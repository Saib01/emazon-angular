import { TestBed } from '@angular/core/testing';
import { ClientGuard } from './client.guard';
import { Router } from '@angular/router';
import { TokenService } from '@services/token.service';



describe('ClientGuard', () => {
  let clientGuard: ClientGuard;
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
        ClientGuard,
        { provide: TokenService, useValue: tokenServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    clientGuard = TestBed.inject(ClientGuard);
    tokenService = TestBed.inject(TokenService);
    router = TestBed.inject(Router);
  });

  test('should allow activation if token is valid and user has CLIENT role', () => {
    (tokenService.isValidToken as jest.Mock).mockReturnValue(true);
    (tokenService.getUserRole as jest.Mock).mockReturnValue(['CLIENT']);

    const result = clientGuard.canActivate();

    expect(result).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  test('should prevent activation and navigate to login if token is invalid', () => {
    (tokenService.isValidToken as jest.Mock).mockReturnValue(false);

    const result = clientGuard.canActivate();

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });

  test('should prevent activation and navigate to login if user does not have CLIENT role', () => {
    (tokenService.isValidToken as jest.Mock).mockReturnValue(true);
    (tokenService.getUserRole as jest.Mock).mockReturnValue(['USER']);

    const result = clientGuard.canActivate();

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });
});
