import { Http } from "@angular/http";
import { Subject } from "rxjs/Subject";
import { CompleterData, CompleterItem } from "../src";
export declare class CustomData extends Subject<CompleterItem[]> implements CompleterData {
    private http;
    constructor(http: Http);
    search(term: string): void;
    cancel(): void;
    convertToItem(data: any): CompleterItem | null;
}
