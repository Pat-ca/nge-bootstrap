import {NgModule} from '@angular/core';
import {NgeToast} from './toast';
export {NgeToast} from './toast';

@NgModule(
    {
        declarations: [NgeToast],
        exports: [NgeToast]
    })
export class NgeToastModule {
}
