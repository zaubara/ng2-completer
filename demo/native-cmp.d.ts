import { CompleterService, CompleterItem } from "../src";
import { Http } from "@angular/http";
export declare class NativeCmp {
    countries: any;
    colors: any;
    quotes: {
        qt: string;
        nm: string;
    }[];
    seinfeldEpisode: any;
    color2: string;
    private openCloseExample;
    private dataService;
    private dataService2;
    private countryName2;
    private quote;
    private dataRemote;
    private dataRemote2;
    private dataService3;
    private dataService4;
    private customData;
    private isOpen;
    constructor(completerService: CompleterService, http: Http);
    onCountrySelected(selected: CompleterItem): void;
    onQuoteSelected(selected: CompleterItem): void;
    onOpened(isOpen: boolean): void;
    onToggle(): void;
    onFocus(): void;
}
