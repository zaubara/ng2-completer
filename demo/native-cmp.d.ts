import { CompleterService, CompleterItem } from "../src";
import { Http } from "@angular/http";
export declare class NativeCmp {
    countries: any;
    colors: any;
    quotes: {
        qt: string;
        nm: string;
    }[];
    private openCloseExample;
    private dataService;
    private dataService2;
    private countryName2;
    private quote;
    private dataRemote;
    private dataRemote2;
    private dataService3;
    private customData;
    constructor(completerService: CompleterService, http: Http);
    onCountrySelected(selected: CompleterItem): void;
    onQuoteSelected(selected: CompleterItem): void;
    onOpen(): void;
    onClose(): void;
}
