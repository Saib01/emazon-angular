import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ControlErrorComponent } from './molecules/control-error/control-error.component';
import { InputTextComponent } from './molecules/input-text/input-text.component';
import { MultiSelectComponent } from './molecules/multi-select/multi-select.component';
import { SimpleSelectComponent } from './molecules/simple-select/simple-select.component';
import { TextAreaComponent } from './molecules/text-area/text-area.component';
import { RangePipe } from '../components/pipe/range.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterFormComponent } from '../components/organisms/register-form/register-form.component';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './atoms/button/button.component';
import { StatusResponseComponent } from './molecules/status-response/status-response.component';
import { DisplayFieldComponent } from './molecules/display-field/display-field.component';
import { FilterSelectComponent } from './molecules/filter-select/filter-select.component';
import { PaginationParamsComponent } from './molecules/pagination-params/pagination-params.component';


@NgModule({
  declarations: [
    InputTextComponent,
    TextAreaComponent,
    MultiSelectComponent,
    SimpleSelectComponent,
    ControlErrorComponent,
    ButtonComponent,
    RangePipe,
    RegisterFormComponent,
    StatusResponseComponent,
    DisplayFieldComponent,
    FilterSelectComponent,
    PaginationParamsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    InputTextComponent,
    TextAreaComponent,
    MultiSelectComponent,
    SimpleSelectComponent,
    ControlErrorComponent,
    ButtonComponent,
    RangePipe,
    RegisterFormComponent,
    StatusResponseComponent,
    DisplayFieldComponent,
    FilterSelectComponent,
    PaginationParamsComponent
  ] 
})
export class SharedModule { }
