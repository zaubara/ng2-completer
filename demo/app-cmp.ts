"use strict";
import {Component, provide} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {HTTP_PROVIDERS} from "@angular/http";

import {AutocompleteCmp} from "../src/components/ng2-autocomplete/autocomplete-cmp";
import {AutocompleteService} from "../src/components/ng2-autocomplete/services/autocomplete-service";
import {AutocompleteData} from "../src/components/ng2-autocomplete/services/autocomplete-data";
import {AUTOCOMPLET_DATA_PROVIDES} from "../src/components/ng2-autocomplete/services/autocomplete-data-factory";
import {AutocompleteItem} from "../src/components/ng2-autocomplete/autocomplete-item";


import "rxjs/Rx";

let template = require("./app-cmp.html");
let style = require("./app-cmp.css");

@Component({
    selector: "demo-app",
    directives: [AutocompleteCmp, ROUTER_DIRECTIVES],
    template: template,
    styles: [style],
    providers: [AutocompleteService, AUTOCOMPLET_DATA_PROVIDES, HTTP_PROVIDERS]
})
export class AppComponent {
    public countries = require("./res/data/countries.json");
    public quotes = [
        {
            qt: "Always forgive your enemies; nothing annoys them so much.",
            nm: "Friedrich Nietzsche"
        },
        {
            qt: "Analyzing humor is like dissecting a frog. Few people are interested and the frog dies of it.",
            nm: "E.B. White"
        },
        {
            qt: "Humor is perhaps a sense of intellectual perspective: an awareness that some things are really important, others not; and that the two kinds are most oddly jumbled in everyday affairs.",
            nm: "Voltaire"
        },
        {
            qt: "I think the next best thing to solving a problem is finding some humor in it.",
            nm: "Frank Howard Clark"
        },
        {
            qt: "Life is tough, and if you have the ability to laugh at it you have the ability to enjoy it.",
            nm: "Salma Hayek"
        },
        {
            qt: "Never be afraid to laugh at yourself. After all, you could be missing out on the joke of the century.",
            nm: "Benjamin Franklin"
        },
        {
            qt: "That is the saving grace of humor. If you fail no one is laughing at you.",
            nm: "William Arthur Ward"
        },
        {
            qt: "The best jokes are dangerous, and dangerous because they are in some way truthful.",
            nm: "Kurt Vonnegut"
        },
        {
            qt: "There’s so much comedy on television. Does that cause comedy in the streets?",
            nm: "Henry Ford"
        },
        {
            qt: "You are not angry with people when you laugh at them. Humor teaches tolerance.",
            nm: "W. Somerset Maugham"
        }
    ];

    private dataService: AutocompleteData;
    private countryName = "";
    private dataService2: AutocompleteData;
    private quote = "";
    private dataRemote: AutocompleteData;

    constructor(private autocompleteService: AutocompleteService) {
        this.dataService = autocompleteService.local(this.countries, "name", "name").imageField("flag");
        this.dataService2 = autocompleteService.local(this.quotes, "nm", "nm").descriptionField("qt");
        this.dataRemote = autocompleteService.remote(
            "https://raw.githubusercontent.com/oferh/ng2-autocomplete/ver-0.2.0/demo/res/data/countries.json?",
            "name",
            "name");
    }

    public onCountrySelected(selected: AutocompleteItem) {
        this.countryName = selected.title;
    }

    public onQuoteSelected(selected: AutocompleteItem) {
        this.quote = selected.description;
    }

}
