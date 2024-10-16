import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { AdminTemplateComponent } from './admin/admin-template.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryIconComponent } from '../atoms/icons/category-icon/category-icon.component';
import { LogoEmazonComponent } from '../atoms/logo-emazon/logo-emazon.component';
import { MenuArrowComponent } from '../atoms/icons/menu-arrow/menu-arrow.component';
import { SideBarItemComponent } from '../molecules/sidebar-item/side-bar-item.component';
import { SideBarComponent } from '../organisms/side-bar/side-bar.component';
import { HeaderComponent } from '../organisms/header/header.component';
import { HomeIconComponent } from '../atoms/icons/home-icon/home-icon.component';
import { UserIconComponent } from '../atoms/icons/user-icon/user-icon.component';
import { BrandIconComponent } from '../atoms/icons/brand-icon/brand-icon.component';


@NgModule({
  declarations: [
    AdminTemplateComponent,
    MenuArrowComponent,
    UserIconComponent,
    LogoEmazonComponent,
    CategoryIconComponent,
    HomeIconComponent,
    BrandIconComponent,
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
