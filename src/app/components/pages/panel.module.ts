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


@NgModule({
  declarations: [
    ListCategoryComponent,
    CreateCategoryComponent,
    HomeComponent,
    InputTextComponent,
    TextAreaComponent,
    ControlErrorComponent,
    ButtonComponent,
    RangePipe
  ],
  imports: [
    CommonModule,
    BoardsRoutingModule,
    ReactiveFormsModule,
  ]
})
export class PanelModule { }
