import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserInfoComponent } from './user-info.component';
import { AuthService } from '@services/auth.service';
import { TokenService } from '@services/token.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { UserInfo } from '@models/user-info.model';
import { ElementRef } from '@angular/core';

describe('User InfoComponent', () => {

  const mockUser:UserInfo|null={id: "4",
    email: "cliente@example.com",
    role: "ROLE_CLIENT"
  };
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;
  let mockRouter: any;
  let mockTokenService: any;
  let mockAuthService: any;

  beforeEach(() => {
    mockRouter = {
      navigate: jest.fn(),
      routerState: {
        snapshot: {
          url: ''
        }
      }
    };
    mockTokenService = {
      removeToken: jest.fn()
    };
    mockAuthService = {
      getUserStatus: jest.fn().mockReturnValue(of({ role: 'ADMIN' })),
      removerUser: jest.fn()
    };

    TestBed.configureTestingModule({
      declarations: [UserInfoComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: TokenService, useValue: mockTokenService },
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  test('should call getUserStatus on init and set user info', () => {
    component.ngOnInit();
    expect(mockAuthService.getUserStatus).toHaveBeenCalled();
    expect(component.user).toEqual({ role: 'ADMIN' });
  });

  test('should toggle user info visibility', () => {
    component.toggleUserInfo();
    expect(component.isVisibleUserInfo).toBe(true);
    component.toggleUserInfo();
    expect(component.isVisibleUserInfo).toBe(false);
  });

  test('should navigate to login when login is called', () => {
    component.login();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  test('should navigate to /panel/home when logout is called and url contains "create"', () => {
    mockRouter.routerState.snapshot.url = '/panel/create';
    component.logout();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/panel/home']);
  });

  test('should remove token and user on logout', () => {
    component.logout();
    expect(mockTokenService.removeToken).toHaveBeenCalled();
    expect(mockAuthService.removerUser).toHaveBeenCalled();
    expect(component.isVisibleUserInfo).toBe(false);
  });

  test('should return client if user is null or role is CLIENT', () => {
    component.user = null;
    expect(component.getSimpleRole()).toBe('client');
    component.user = { id: mockUser.id,email: mockUser.email,role: 'CLIENT' };
    expect(component.getSimpleRole()).toBe('client');
  });

  test('should return Warehouse if role is AUX', () => {
    component.user = { id: mockUser.id,email: mockUser.email, role: 'AUX' };
    expect(component.getSimpleRole()).toBe('Warehouse');
  });

  test('should return Admin if role is not CLIENT or AUX', () => {
    component.user = { id: mockUser.id,email: mockUser.email, role: 'ADMIN' };
    expect(component.getSimpleRole()).toBe('Admin');
  });
  
  test('should close the isVisibleUserInfo when clicking outside the dropdown', () => {
    component.isVisibleUserInfo = true;
    const toggleElement = document.createElement('div');
    const optionElement = document.createElement('div');
    component.userButton = new ElementRef(toggleElement);
    component.userInfoContainer = new ElementRef(optionElement);

    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    document.body.dispatchEvent(event);

    expect(component.isVisibleUserInfo).toBeFalsy();
  });

  test('should not close the isVisibleUserInfo when clicking inside the dropdown', () => {
    component.isVisibleUserInfo = true;

    const toggleElement = document.createElement('div');
    const optionElement = document.createElement('div');
    component.userButton = new ElementRef(toggleElement);
    component.userInfoContainer = new ElementRef(optionElement);

    toggleElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

    expect(component.isVisibleUserInfo).toBeTruthy();

    optionElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

    expect(component.isVisibleUserInfo).toBeTruthy();
  });
});