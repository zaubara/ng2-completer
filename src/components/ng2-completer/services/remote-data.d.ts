import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { CompleterBaseData } from "./completer-base-data";
export declare class RemoteData extends CompleterBaseData {
    private http;
    private _remoteUrl;
    private remoteSearch;
    private _urlFormater;
    private _dataField;
    constructor(http: Http);
    remoteUrl(remoteUrl: string): this;
    urlFormater(urlFormater: (term: string) => string): void;
    dataField(dataField: string): void;
    search(term: string): void;
    cancel(): void;
}
