import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideForms } from '@angular/forms';
import {HTTP_PROVIDERS} from "@angular/http";

import { AppComponent }  from './app-cmp';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent ],
  providers:    [HTTP_PROVIDERS, provideForms()],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }