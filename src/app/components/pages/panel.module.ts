import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BoardsRoutingModule } from './panel-routing.module';
import { HomeComponent } from './home/home.component';
import { InputTextComponent } from '../molecules/input-text/input-text.component';
import { TextAreaComponent } from '../molecules/text-area/text-area.component';
import { ButtonComponent } from '../atoms/basic-components/button/button.component';
import { ControlErrorComponent } from '../molecules/control-error/control-error.component';
import { CreateCategoryComponent } from './category/create-category/create-category.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { RangePipe } from '../pipe/range.pipe';
import { BasicFormComponent } from '../organisms/basic-form/basic-form.component';
import { CreateBrandComponent } from './brand/create-brand/create-brand.component';
import { RouterModule } from '@angular/router';
import { BasicTableInfoComponent } from '../organisms/basic-table-info/basic-table-info.component';
import { ListBrandComponent } from './brand/list-brand/list-brand.component';


@NgModule({
  declarations: [
    ListCategoryComponent,
    ListBrandComponent,
    CreateCategoryComponent,
    CreateBrandComponent,
    BasicFormComponent,
    BasicTableInfoComponent,
    HomeComponent,
    InputTextComponent,
    TextAreaComponent,
    ControlErrorComponent,
    ButtonComponent,
    RangePipe,
    BasicTableInfoComponent
  ],
  imports: [
    CommonModule,
    BoardsRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class PanelModule { }
