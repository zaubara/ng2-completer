"use strict";
import {Component} from "@angular/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {Http, HTTP_PROVIDERS} from "@angular/http";

import {AutocompleteDirective} from "../src/component/ng2-autocomplete/autocomplete";
import "rxjs/Rx";

let template = require("./app-cmp.html");
let style = require("./app-cmp.css");

@Component({
    selector: "seed-app",
    directives: [AutocompleteDirective, ROUTER_DIRECTIVES],
    template: template,
    styles: [style]
})
export class AppComponent  {
    public countryName = "";

    constructor(private http: Http) {
    }

    public serachCountry() {
        return (filter: string): Promise<Array<{ text: string, data: any }>> => {
            return new Promise<Array<{ text: string, data: any }>>((resolve, reject) => {
                this.http.get("https://restcountries.eu/rest/v1/name/" + filter)
                .map(res => res.json())
                .map(countries => countries.map((country: any) => {
                    return {text: country.name, data: country};
                }))
                .subscribe(
                    countries => resolve(countries),
                    err => reject(err)
                );
            });
        };
    }

    public onCountrySelected(selected: { text: string, data: any }) {
        this.countryName = selected.text;
    }
}
