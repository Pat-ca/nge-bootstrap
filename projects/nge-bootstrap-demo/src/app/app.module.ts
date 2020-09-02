import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgeDropdownModule, NgeDatePickerModule, NgeToastModule, NgeTabModule } from 'projects/nge-bootstrap/src/lib';
import { NgeModule } from 'nge-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgeDropdownModule,
    NgeToastModule,
    NgeTabModule,
    NgeDatePickerModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
