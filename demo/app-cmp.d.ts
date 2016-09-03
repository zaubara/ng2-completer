import "rxjs/Rx";
import { CompleterService, CompleterItem } from "../src/ng2-completer";
import { Http } from "@angular/http";
export declare class AppComponent {
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
    constructor(completerService: CompleterService, http: Http);
    onCountrySelected(selected: CompleterItem): void;
    onQuoteSelected(selected: CompleterItem): void;
}
