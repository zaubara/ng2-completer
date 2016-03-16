"use strict";
import {Component} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router"
import {Http, HTTP_PROVIDERS} from "angular2/http";

import {AutocompleteDirective} from "../component/ng2-autocomplete/autocomplete";
import "rxjs/Rx";

@Component({
    selector: "seed-app",
    directives: [AutocompleteDirective, ROUTER_DIRECTIVES],
    templateUrl: "./ng2-autocomplete/src/demo/app-cmp.html",
    styleUrls: ["./ng2-autocomplete/src/demo/app-cmp.css"]
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
                .map(countries => countries.map(country => {
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
