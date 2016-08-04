import { Http } from "@angular/http";
import { Subject } from "rxjs/Subject";
import { CompleterData } from "../src/components/ng2-completer/services/completer-data";
import { CompleterItem } from "../src/components/ng2-completer/completer-item";
export declare class CustomData extends Subject<CompleterItem[]> implements CompleterData {
    private http;
    constructor(http: Http);
    search(term: string): void;
    cancel(): void;
}
