import {Observable} from "rxjs/Observable";

import {AutocompleteItem} from "../autocomplete-item";

export interface AutocompleteData extends Observable<AutocompleteItem[]>{
    search(term: string): void;
    cancel(): void;
};