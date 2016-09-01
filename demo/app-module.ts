import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app-cmp';
import { HttpModule } from "@angular/http";
import { Ng2CompleterModule } from "../src/ng2-completer.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
      BrowserModule,
      Ng2CompleterModule,
      FormsModule,
      HttpModule
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }