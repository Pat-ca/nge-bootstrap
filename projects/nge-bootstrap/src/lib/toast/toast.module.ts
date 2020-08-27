import {NgModule} from '@angular/core';
import {NgeToast, NgeToastHeader} from './toast';
export {NgeToast, NgeToastHeader} from './toast';

@NgModule(
    {
        declarations: [NgeToast, NgeToastHeader],
        exports: [NgeToast, NgeToastHeader]
    })
export class NgeToastModule {
}
