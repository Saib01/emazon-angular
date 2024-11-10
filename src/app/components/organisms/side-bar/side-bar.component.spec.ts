import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideBarComponent } from './side-bar.component';
import { AuthService } from '@services/auth.service';

import { UserInfo } from '@models/user-info.model';
import { of } from 'rxjs';
import { SideBarItemComponent } from '@shared/molecules/sidebar-item/side-bar-item.component';
import { WarehouseIconComponent } from '../../atoms/icons/warehouse-icon/warehouse-icon.component';
import {  NO_ERRORS_SCHEMA } from '@angular/core';


describe('SideBarComponent', () => {
  let component: SideBarComponent;
  let fixture: ComponentFixture<SideBarComponent>;
  let authService: AuthService;

  const mockUser: UserInfo =  {id:'1',email: 'test@example.com',role:'ADMIN' };

  beforeEach(async () => {
    const authServiceMock= { 
      getUserStatus: jest.fn().mockReturnValue(of(mockUser))
     };
     await TestBed.configureTestingModule({
      declarations: [SideBarComponent,SideBarItemComponent,WarehouseIconComponent,],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
      schemas:[NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set user status on ngOnInit', () => {
    component.ngOnInit();
    expect(authService.getUserStatus).toHaveBeenCalled();
    expect(component.user).toEqual(mockUser);
  });

  it('should toggle closeSideBar when toggleSidebar is called', () => {
    const initialCloseState = component.closeSideBar;
    component.toggleSidebar();
    expect(component.closeSideBar).toBe(!initialCloseState);
  });
});