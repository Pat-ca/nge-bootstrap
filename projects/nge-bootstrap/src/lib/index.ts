import { NgModule } from '@angular/core';
import { NgeDropdownModule } from './dropdown/dropdown.module';
import { NgeToastModule } from './toast/toast.module';
import { NgeTabModule } from './tab/tab.module';

export {
  NgeDropdown,
  NgeDropdownToggle,
  NgeDropdownItem,
  NgeDropdownMenu,
} from './dropdown/dropdown.module';

export {
  NgeToast,
} from './toast/toast.module';

export {
  NgeTabs,
  NgeTabTitle,
  NgeTabContent,
} from './tab/tab.module';

export {
  NgeDropdownModule,
  NgeToastModule,
  NgeTabModule
}
const NGB_MODULES = [NgeDropdownModule, NgeToastModule];

@NgModule({ imports: NGB_MODULES, exports: NGB_MODULES })
export class NgeModule {}
