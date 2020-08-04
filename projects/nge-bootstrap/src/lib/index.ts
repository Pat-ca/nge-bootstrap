import {NgModule} from '@angular/core';
import {NgeDropdownModule} from './dropdown/dropdown.module';

export {
  NgeDropdown,
  NgeDropdownToggle,
  NgeDropdownItem,
  NgeDropdownMenu,
  NgeDropdownModule,
} from './dropdown/dropdown.module';



const NGB_MODULES = [
  NgeDropdownModule
];

@NgModule({imports: NGB_MODULES, exports: NGB_MODULES})
export class NgeModule {
}
