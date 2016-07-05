"use strict";
import {bootstrap}    from "@angular/platform-browser-dynamic";
import {provideRouter, RouterConfig} from "@angular/router";
import {HTTP_PROVIDERS} from "@angular/http";
import { enableProdMode } from '@angular/core';


import {AppComponent} from "./app-cmp";

if ("production" === ENV) {
  // Production
  enableProdMode();
}

const routes: RouterConfig = [
  {
    path: '/',
    component: AppComponent
  }
];

bootstrap(AppComponent, [
    provideRouter(routes),
    HTTP_PROVIDERS,
]);
