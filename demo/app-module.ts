import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app-cmp';
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";
import { Ng2CompleterModule } from "../src/ng2-completer.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
  imports:      [ BrowserModule, RouterModule, HttpModule, Ng2CompleterModule, FormsModule, ReactiveFormsModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }