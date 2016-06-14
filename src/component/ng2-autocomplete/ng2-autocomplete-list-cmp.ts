"use strict";
import {Component, Output, Input, EventEmitter} from "@angular/core";


let template = require("./ng2-autocomplete-list-cmp.html");
let defaultStyles = require("./ng2-autocomplete-list-cmp.css");


@Component({
    selector: "autocomplete-list",
    template: template,
    styles: [defaultStyles]
})
export class Ng2AutocompleteListCmp  {
    @Input() public results: any[] = [];
    @Output() public selected = new EventEmitter();

    public list: any;
    public currentIndex = -1;

    public onClick(result: any) {
        this.selected.emit(result);
    }

    public hoverRow(index: number) {
        this.currentIndex = index;
    };
}
