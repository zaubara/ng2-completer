import { Directive, Input } from "@angular/core";

import { CompleterData } from "../components/ng2-completer/services/completer-data";


@Directive({
    selector: "[ctr-completer]",
})
export class CtrCompleter {
    @Input("ctr-completer") dataService: CompleterData;

    constructor() { }

    public search(term: string) {
        console.log(`search ${term}`);
    }
}
