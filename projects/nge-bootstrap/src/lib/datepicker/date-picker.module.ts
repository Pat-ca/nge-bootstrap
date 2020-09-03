import { NgModule } from '@angular/core';
import { NgeDatePicker } from './date-picker';
import { CommonModule } from '@angular/common';
export { NgeDatePicker } from './date-picker';


@NgModule({
  declarations: [
    NgeDatePicker,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgeDatePicker
  ]
})
export class NgeDatePickerModule { }
