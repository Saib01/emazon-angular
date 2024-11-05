import { TestBed } from '@angular/core/testing';
import { AdminGuard } from './admin.guard';
import { Router } from '@angular/router';

import { AuthService } from '@services/auth.service';
import { of } from 'rxjs';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let authServiceMock: { getUserStatus: jest.Mock };
  let routerMock: { navigate: jest.Mock };
  let mockUserStatus={
    id:'1',
    email:'mail@mail.com',
    role:'ADMIN'
  }
  beforeEach(() => {
    authServiceMock = { getUserStatus: jest.fn() };
    routerMock = { navigate: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        AdminGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });
    guard = TestBed.inject(AdminGuard);
  });

  it('should allow access if the user has ADMIN role', () => {
    authServiceMock.getUserStatus.mockReturnValue(of(mockUserStatus));

    guard.canActivate().subscribe((result) => {
      expect(result).toBe(true);
      expect(routerMock.navigate).not.toHaveBeenCalled();
    });
  });

  it('should deny access and navigate to login if the user does not have ADMIN role', () => {
    mockUserStatus.role='CLIENT';
    authServiceMock.getUserStatus.mockReturnValue(of(mockUserStatus));

    guard.canActivate().subscribe((result) => {
      expect(result).toBe(false);
      expect(routerMock.navigate).toHaveBeenCalledWith(['login']); 
    });
  });

  it('should deny access and navigate to login if no user role is provided', () => {
    authServiceMock.getUserStatus.mockReturnValue(of(null));

    guard.canActivate().subscribe((result) => {
      expect(result).toBe(false);
      expect(routerMock.navigate).toHaveBeenCalledWith(['login']); 
    });
  });
});
