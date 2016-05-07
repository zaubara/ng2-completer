"use strict";
import "zone.js";
import "reflect-metadata";
import {bootstrap}    from "@angular/platform-browser-dynamic";
import {ROUTER_PROVIDERS} from "@angular/router-deprecated";
import {HTTP_PROVIDERS} from "@angular/http";

import {AppComponent} from "./app-cmp";


bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
]);
