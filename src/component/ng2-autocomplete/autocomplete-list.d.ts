import { EventEmitter } from "@angular/core";
export declare class AutocompleteList {
    selected: EventEmitter<{}>;
    list: any;
    onClick(item: {
        text: string;
        data: any;
    }): void;
}
