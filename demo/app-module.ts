import { NgModule }      from "@angular/core";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent }  from "./app-cmp";
import { MaterialCmp } from "./material-cmp";
import { NativeCmp } from "./native-cmp";
import { routing } from "./app.routing";
import { Ng2CompleterModule } from "../src";
import { CompleterCmpMd } from "./completer-cmp-md";


@NgModule({
  imports: [
      BrowserModule,
      Ng2CompleterModule,
      MaterialModule,
      FormsModule,
      HttpModule,
      routing
  ],
  declarations: [ AppComponent, CompleterCmpMd, NativeCmp, MaterialCmp],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
