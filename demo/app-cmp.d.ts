import { Http } from "@angular/http";
import "rxjs/Rx";
export declare class AppComponent {
    private http;
    countryName: string;
    constructor(http: Http);
    serachCountry(): (filter: string) => Promise<{
        text: string;
        data: any;
    }[]>;
    onCountrySelected(selected: {
        text: string;
        data: any;
    }): void;
}
