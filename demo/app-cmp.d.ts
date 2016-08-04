import { Http } from "@angular/http";
import { FormBuilder } from "@angular/forms";
import "rxjs/Rx";
import { CompleterService, CompleterItem } from "../src/ng2-completer";
export declare class AppComponent {
    private fb;
    private completerService;
    private http;
    countries: any;
    quotes: {
        qt: string;
        nm: string;
    }[];
    private dataService;
    private dataService2;
    private countryName2;
    private quote;
    private dataRemote;
    private dataRemote2;
    private dataService3;
    private dataService4;
    private customData;
    private searchcb;
    constructor(fb: FormBuilder, completerService: CompleterService, http: Http);
    onCountrySelected(selected: CompleterItem): void;
    onQuoteSelected(selected: CompleterItem): void;
}
