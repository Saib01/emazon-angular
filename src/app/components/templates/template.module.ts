import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateRoutingModule } from './template-routing.module';
import { AdminTemplateComponent } from './admin/admin-template.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryIconComponent } from '../atoms/icons/category-icon/category-icon.component';
import { LogoEmazonComponent } from '../atoms/logo-emazon/logo-emazon.component';
import { MenuArrowComponent } from '../atoms/icons/menu-arrow/menu-arrow.component';
import { SideBarItemComponent } from '../../shared/molecules/sidebar-item/side-bar-item.component';
import { SideBarComponent } from '../organisms/side-bar/side-bar.component';
import { HeaderComponent } from '../organisms/header/header.component';
import { HomeIconComponent } from '../atoms/icons/home-icon/home-icon.component';
import { UserInfoComponent } from '../molecules/user-info/user-info.component';
import { BrandIconComponent } from '../atoms/icons/brand-icon/brand-icon.component';
import { ProductIconComponent } from '../atoms/icons/product-icon/product-icon.component';
import { WarehouseIconComponent } from '../atoms/icons/warehouse-icon/warehouse-icon.component';



@NgModule({
  declarations: [
    AdminTemplateComponent,
    MenuArrowComponent,
    UserInfoComponent,
    LogoEmazonComponent,
    HomeIconComponent,
    CategoryIconComponent,
    BrandIconComponent,
    ProductIconComponent,
    WarehouseIconComponent,
    SideBarItemComponent,
    SideBarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    SharedModule
  ],
  
})
export class TemplateModule { }
