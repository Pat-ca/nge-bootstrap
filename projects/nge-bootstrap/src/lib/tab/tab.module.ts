import {NgModule} from '@angular/core';
import {NgeTabs, NgeTabTitle, NgeTabContent} from './tab';
import { CommonModule } from '@angular/common';
export {NgeTabs, NgeTabTitle, NgeTabContent} from './tab';
@NgModule(
    {
        declarations: [NgeTabs, NgeTabTitle, NgeTabContent],
        imports: [
            CommonModule
          ],
        exports: [NgeTabs, NgeTabTitle, NgeTabContent]
    })
export class NgeTabModule {
}
