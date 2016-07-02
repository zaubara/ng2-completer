import {Injectable} from '@angular/core';

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
        let searchFields = this._searchFields.split(',');
        let matches: any[] = [];

        for (let i = 0; i < this._data.length; i++) {
            let match = false;

            for (let s = 0; s < searchFields.length; s++) {
                let value = this.extractValue(this._data[i], searchFields[s]) || '';
                match = match || (value.toString().toLowerCase().indexOf(term.toString().toLowerCase()) >= 0);
            }

            if (match) {
                matches[matches.length] = this._data[i];
            }
        }

        this.next(this.processResults(matches, term));

    }

    
}
