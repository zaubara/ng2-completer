import { FormBuilder } from "@angular/forms";
import { CompleterService, CompleterItem } from "../src/ng2-completer";
import "rxjs/Rx";
export declare class AppComponent {
    private fb;
    private completerService;
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
    private dataService3;
    private dataService4;
    private searchcb;
    constructor(fb: FormBuilder, completerService: CompleterService);
    onCountrySelected(selected: CompleterItem): void;
    onQuoteSelected(selected: CompleterItem): void;
}
