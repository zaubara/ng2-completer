"use strict";
import { enableProdMode } from '@angular/core';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import {HTTP_PROVIDERS} from "@angular/http";
import {bootstrap}    from "@angular/platform-browser-dynamic";

import {AppComponent} from "./app-cmp";

if ("production" === ENV) {
  // Production
  enableProdMode();
}

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    disableDeprecatedForms(),
    provideForms()
]);
