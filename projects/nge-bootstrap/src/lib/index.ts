import { NgModule } from '@angular/core';
import { NgeDropdownModule } from './dropdown/dropdown.module';
import { NgeToastModule } from './toast/toast.module';

// export {
//   NgeDropdown,
//   NgeDropdownToggle,
//   NgeDropdownItem,
//   NgeDropdownMenu,
//   NgeDropdownModule,
// } from './dropdown/dropdown.module';

export {
  NgeDropdownModule,
  NgeToastModule
} 
const NGB_MODULES = [NgeDropdownModule, NgeToastModule];

@NgModule({ imports: NGB_MODULES, exports: NGB_MODULES })
export class NgeModule {}
