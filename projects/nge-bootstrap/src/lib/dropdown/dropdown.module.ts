import { NgModule } from '@angular/core';
import { NgeDropdownToggle, NgeDropdownMenu, NgeDropdown, NgeDropdownItem } from './dropdown';
export { NgeDropdownToggle, NgeDropdownMenu, NgeDropdown, NgeDropdownItem } from './dropdown';


@NgModule({
  declarations: [
    NgeDropdownItem,
    NgeDropdownToggle,
    NgeDropdownMenu,
    NgeDropdown,

  ],
  exports: [
    NgeDropdownItem,
    NgeDropdownToggle,
    NgeDropdownMenu,
    NgeDropdown,
  ]
})
export class NgeDropdownModule { }
