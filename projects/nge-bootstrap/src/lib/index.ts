import {NgModule} from '@angular/core';
import {NgEbDropdownModule} from './dropdown/dropdown.module';

export {
  NgEbDropdown,
  NgEbDropdownToggle,
  NgEbDropdownItem,
  NgEbDropdownMenu,
  NgEbDropdownModule,
} from './dropdown/dropdown.module';



const NGB_MODULES = [
  NgEbDropdownModule
];

@NgModule({imports: NGB_MODULES, exports: NGB_MODULES})
export class NgEbModule {
}
