"use strict";
import {Component, provide} from "@angular/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {HTTP_PROVIDERS} from "@angular/http";

import {AutocompleteCmp} from "../src/components/ng2-autocomplete/autocomplete-cmp";
import {AutocompleteService} from "../src/components/ng2-autocomplete/services/autocomplete-service";
import {AutocompleteData} from "../src/components/ng2-autocomplete/services/autocomplete-data";
import {AUTOCOMPLET_DATA_PROVIDES} from "../src/components/ng2-autocomplete/services/autocomplete-data-factory";


import "rxjs/Rx";

let template = require("./app-cmp.html");
let style = require("./app-cmp.css");

@Component({
    selector: "seed-app",
    directives: [AutocompleteCmp, ROUTER_DIRECTIVES],
    template: template,
    styles: [style],
    providers: [AutocompleteService, AUTOCOMPLET_DATA_PROVIDES, HTTP_PROVIDERS]
})
export class AppComponent {
    public countryName = "";
    public countries = require("./res/data/countries.json");
    public names = [{name: "Ofer"}, {name: "John"}, {name: "Yohan"}];

    private dataService: AutocompleteData;
    private dataService2: AutocompleteData;
    private dataRemote: AutocompleteData;

    constructor(private autocompleteService: AutocompleteService) {
        this.dataService = autocompleteService.local(this.countries, "name", "name");
        this.dataService2 = autocompleteService.local(this.names, "name", "name");
        this.dataRemote = autocompleteService.remote(
            "https://raw.githubusercontent.com/oferh/ng2-autocomplete/ver-0.2.0/demo/res/data/countries.json?",
            "name",
            "name");
    }

    // public serachCountry() {
    //     return (filter: string): Promise<Array<{ text: string, data: any }>> => {
    //         return new Promise<Array<{ text: string, data: any }>>((resolve, reject) => {
    //             this.http.get("https://restcountries.eu/rest/v1/name/" + filter)
    //                 .map(res => res.json())
    //                 .map(countries => countries.map((country: any) => {
    //                     return { text: country.name, data: country };
    //                 }))
    //                 .subscribe(
    //                 countries => resolve(countries),
    //                 err => reject(err)
    //                 );
    //         });
    //     };
    // }

    public onCountrySelected(selected: { text: string, data: any }) {
        this.countryName = selected.text;
    }
}
