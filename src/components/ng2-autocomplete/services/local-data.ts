import {Injectable} from "@angular/core";

import {AutocompleteDataBase} from "./autocomplete-data-base";

@Injectable()
export class LocalData extends AutocompleteDataBase  {

    private _data: any[];

    constructor() {
        super();
    }

    public data(data: any[]){
        this._data = data;
        return this;
    }

    public search(term: string): void {
        let searchFields = this._searchFields.split(",");
        let matches: any[] = this.extractMatches(this._data, term);

        this.next(this.processResults(matches, term));

    }
}
