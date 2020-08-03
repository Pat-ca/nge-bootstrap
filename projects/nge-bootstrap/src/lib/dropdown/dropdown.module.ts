import { NgModule } from '@angular/core';
import { NgEbDropdownToggle, NgEbDropdownMenu, NgEbDropdown, NgEbDropdownItem } from './dropdown';
export { NgEbDropdownToggle, NgEbDropdownMenu, NgEbDropdown, NgEbDropdownItem } from './dropdown';


@NgModule({
  declarations: [
    NgEbDropdownItem,
    NgEbDropdownToggle,
    NgEbDropdownMenu,
    NgEbDropdown,

  ],
  exports: [
    NgEbDropdownItem,
    NgEbDropdownToggle,
    NgEbDropdownMenu,
    NgEbDropdown,
  ]
})
export class NgEbDropdownModule { }
