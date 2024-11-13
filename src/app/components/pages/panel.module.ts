import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BoardsRoutingModule } from './panel-routing.module';
import { HomeComponent } from './home/home.component';
import { CreateCategoryComponent } from './category/create-category/create-category.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { BasicFormComponent } from '../organisms/basic-form/basic-form.component';
import { CreateBrandComponent } from './brand/create-brand/create-brand.component';
import { RouterModule } from '@angular/router';
import { BasicTableInfoComponent } from '../organisms/basic-table-info/basic-table-info.component';
import { ListBrandComponent } from './brand/list-brand/list-brand.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { CreateWarehouseAssistantComponent } from './warehouse-assistant/create-warehouse-assistant/create-warehouse-assistant.component';
import { SharedModule } from '@shared/shared.module';
import { SupplyProductComponent } from './product/supply-product/supply-product.component';
import { ShowProductComponent } from './product/show-product/show-product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';


@NgModule({
  declarations: [
    ListCategoryComponent,
    ListBrandComponent,
    ListProductComponent,
    CreateCategoryComponent,
    CreateBrandComponent,
    CreateProductComponent,
    CreateWarehouseAssistantComponent,
    SupplyProductComponent,
    BasicFormComponent,
    BasicTableInfoComponent,
    HomeComponent,
    BasicTableInfoComponent,
    ShowProductComponent,
    ShoppingCartComponent
  ],
  imports: [
    CommonModule,
    BoardsRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ]
})
export class PanelModule { }
