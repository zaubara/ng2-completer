"use strict";
import { Component } from "@angular/core";

import "rxjs/Rx";

let template = require("./app-cmp.html");

@Component({
    selector: "demo-app",
    template: template
})
export class AppComponent {}
