import {NgModule} from '@angular/core';
import {NgeTabs, NgeTabTitle, NgeTabContent} from './tab';
export {NgeTabs, NgeTabTitle, NgeTabContent} from './tab';
@NgModule(
    {
        declarations: [NgeTabs, NgeTabTitle, NgeTabContent],
        exports: [NgeTabs, NgeTabTitle, NgeTabContent]
    })
export class NgeTabModule {
}
