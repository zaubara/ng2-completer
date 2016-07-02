import {Injectable, Injector} from '@angular/core';

import {LocalData} from "./local-data";


@Injectable()
export class AutocompleteService {
    constructor(private injector: Injector){}

    local(data: any[], searchFields: string, titleField: string) {
        let localData = <LocalData>this.injector.get(LocalData);
        return localData
            .data(data)
            .searchFieldss(searchFields)
            .titleField(titleField);

    }
}
