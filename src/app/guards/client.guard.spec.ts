import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthService } from '@services/auth.service';
import { of } from 'rxjs';
import { ClientGuard } from './client.guard';

describe('ClientGuard', () => {
  let guard: ClientGuard;
  let authServiceMock: { getUserStatus: jest.Mock };
  let routerMock: { navigate: jest.Mock };
  let mockUserStatus={
    id:'1',
    email:'mail@mail.com',
    role:'CLIENT'
  }
  beforeEach(() => {
    authServiceMock = { getUserStatus: jest.fn() };
    routerMock = { navigate: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        ClientGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });
    guard = TestBed.inject(ClientGuard);
  });

  test('should allow access if the user has CLIENT role', () => {
    authServiceMock.getUserStatus.mockReturnValue(of(mockUserStatus));

    guard.canActivate().subscribe((result) => {
      expect(result).toBe(true);
      expect(routerMock.navigate).not.toHaveBeenCalled();
    });
  });
  test('should deny access and navigate to login if the user does not have CLIENT role', () => {
    mockUserStatus.role='ADMIN';
    authServiceMock.getUserStatus.mockReturnValue(of(mockUserStatus));

    guard.canActivate().subscribe((result) => {
      expect(result).toBe(false);
      expect(routerMock.navigate).toHaveBeenCalledWith(['panel/home']); 
    });
  });

  test('should deny access and navigate to login if no user role is provided', () => {
    authServiceMock.getUserStatus.mockReturnValue(of(null));

    guard.canActivate().subscribe((result) => {
      expect(result).toBe(false);
      expect(routerMock.navigate).toHaveBeenCalledWith(['login']); 
    });
  });
});
