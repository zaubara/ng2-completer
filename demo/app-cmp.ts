"use strict";
import {Component} from "@angular/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {Http, HTTP_PROVIDERS} from "@angular/http";

import {AutocompleteCmp} from "../src/components/ng2-autocomplete/autocomplete-cmp";
import {AutocompleteService} from "../src/components/ng2-autocomplete/services/autocomplete-service";
import {AutocompleteData} from "../src/components/ng2-autocomplete/services/autocomplete-data";
import {LocalData} from "../src/components/ng2-autocomplete/services/local-data";


import "rxjs/Rx";

let template = require("./app-cmp.html");
let style = require("./app-cmp.css");

@Component({
    selector: "seed-app",
    directives: [AutocompleteCmp, ROUTER_DIRECTIVES],
    template: template,
    styles: [style],
    providers: [AutocompleteService, LocalData]
})
export class AppComponent {
    public countryName = "";
    public countries = require("./res/data/countries.json");

    private dataService: AutocompleteData;

    constructor(private http: Http, private autocompleteService: AutocompleteService) {
        this.dataService = autocompleteService.local(this.countries, "name", "name");
    }

    public serachCountry() {
        return (filter: string): Promise<Array<{ text: string, data: any }>> => {
            return new Promise<Array<{ text: string, data: any }>>((resolve, reject) => {
                this.http.get("https://restcountries.eu/rest/v1/name/" + filter)
                    .map(res => res.json())
                    .map(countries => countries.map((country: any) => {
                        return { text: country.name, data: country };
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
