import {NgModule} from '@angular/core';
import {NgeToast, ToastConfig} from './toast';
export {NgeToast, ToastConfig} from './toast';

@NgModule(
    {
        declarations: [NgeToast],
        exports: [NgeToast]
    })
export class NgeToastModule {
}
