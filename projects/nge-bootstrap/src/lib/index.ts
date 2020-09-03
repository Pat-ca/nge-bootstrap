import { NgModule } from '@angular/core';
import { NgeDropdownModule } from './dropdown/dropdown.module';
import { NgeToastModule } from './toast/toast.module';
import { NgeTabModule } from './tab/tab.module';
import { NgeDatePickerModule } from './datepicker/date-picker.module';

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
  NgeDatePicker,
} from './datepicker/date-picker.module';


export {
  NgeDropdownModule,
  NgeToastModule,
  NgeTabModule,
  NgeDatePickerModule
}


const NGB_MODULES = [NgeDropdownModule, NgeToastModule, NgeTabModule, NgeDatePickerModule];

@NgModule({ imports: NGB_MODULES, exports: NGB_MODULES })
export class NgeModule {}
