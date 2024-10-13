import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BoardsRoutingModule } from './panel-routing.module';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { InputTextComponent } from '../molecules/input-text/input-text.component';
import { TextAreaComponent } from '../molecules/text-area/text-area.component';
import { ButtonComponent } from '../atoms/basic-components/button/button.component';
import { ControlErrorComponent } from '../molecules/control-error/control-error.component';


@NgModule({
  declarations: [
    CategoryComponent,
    HomeComponent,
    InputTextComponent,
    TextAreaComponent,
    ControlErrorComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    BoardsRoutingModule,
    ReactiveFormsModule,
  ]
})
export class PanelModule { }
