import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgeDropdownModule } from 'projects/nge-bootstrap/src/lib';
import { NgeToastModule } from 'projects/nge-bootstrap/src/lib/toast/toast.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgeDropdownModule,
    NgeToastModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
