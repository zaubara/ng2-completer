"use strict";
import {bootstrap}    from "@angular/platform-browser-dynamic";
import {ROUTER_PROVIDERS} from "@angular/router-deprecated";
import {HTTP_PROVIDERS} from "@angular/http";
import { enableProdMode } from '@angular/core';


import {AppComponent} from "./app-cmp";

if ("production" === ENV) {
  // Production
  enableProdMode();
}

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
]);
