import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { AppComponent }  from "./app-cmp";
import { Ng2CompleterModule } from "../src";

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
