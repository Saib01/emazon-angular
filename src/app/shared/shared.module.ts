import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from '../components/atoms/basic-components/button/button.component';
import { ControlErrorComponent } from './molecules/control-error/control-error.component';
import { InputTextComponent } from './molecules/input-text/input-text.component';
import { MultiSelectComponent } from './molecules/multi-select/multi-select.component';
import { SimpleSelectComponent } from './molecules/simple-select/simple-select.component';
import { TextAreaComponent } from './molecules/text-area/text-area.component';
import { RangePipe } from '../components/pipe/range.pipe';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InputTextComponent,
    TextAreaComponent,
    MultiSelectComponent,
    SimpleSelectComponent,
    ControlErrorComponent,
    ButtonComponent,
    RangePipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [
    InputTextComponent,
    TextAreaComponent,
    MultiSelectComponent,
    SimpleSelectComponent,
    ControlErrorComponent,
    ButtonComponent,
    RangePipe
  ] 
})
export class SharedModule { }
