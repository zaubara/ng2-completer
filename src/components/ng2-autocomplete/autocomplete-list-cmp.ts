"use strict";
import {Component, Output, Input, EventEmitter, ElementRef, AfterContentInit} from "@angular/core";
import {AutocompleteItem} from "./autocomplete-item";
import {AutocompleteListItemCmp} from "./autocomplete-list-item-cmp";



let template = require("./autocomplete-list-cmp.html");
let defaultStyles = require("./autocomplete-list-cmp.css");
@Component({
    selector: "autocomplete-list",
    template: template,
    styles: [defaultStyles],
    directives: [AutocompleteListItemCmp]
})
export class AutocompleteListCmp implements AfterContentInit {
    @Input() public results: AutocompleteItem[] = [];
    @Input() public matchClass: string;
    @Input() public searchStr = "";
    @Input() public textSearching: string;
    @Input() public searching: boolean;
    @Input() public textNoResults: string;
    @Input() public displaySearching: boolean;
    @Output() public selected = new EventEmitter<AutocompleteItem>();

    public list: any;
    public currentIndex = -1;

    private isScrollOn = false;
    private dd: any;

    constructor(private listElm: ElementRef) { }

    public ngAfterContentInit() {
        this.dd = this.listElm.nativeElement.querySelector(".autocomplete-dropdown");
        let css = getComputedStyle(this.dd);
        this.isScrollOn = css.maxHeight && css.overflowY === "auto";
    }

    public onClick(result: AutocompleteItem) {
        this.selected.emit(result);
    }

    public hoverRow(index: number) {
        this.currentIndex = index;
    };

    public incIndex() {
        this.currentIndex++;
        if (this.isScrollOn) {
            let row = this.dropdownRow();
            if (this.dropdownHeight() < row.getBoundingClientRect().bottom) {
                this.dropdownScrollTopTo(this.dropdownRowOffsetHeight(row));
            }
        }
    }

    public decIndex() {
        this.currentIndex--;
        if (this.isScrollOn) {
            let rowTop = this.dropdownRowTop();
            if (rowTop < 0) {
                this.dropdownScrollTopTo(rowTop - 1);
            }
        }
    }

    public unselect() {
        this.currentIndex = -1;
    }

    public toTop() {
        this.currentIndex = 0;
    }

    private dropdownRow() {
        return this.listElm.nativeElement.querySelectorAll(".autocomplete-row")[this.currentIndex];
    }

    private dropdownHeight() {
        return this.dd.getBoundingClientRect().top +
            parseInt(getComputedStyle(this.dd).maxHeight, 10);
    }

    private dropdownScrollTopTo(offset: any) {
        this.dd.scrollTop = this.dd.scrollTop + offset;
    }

    private dropdownRowOffsetHeight(row: any) {
        let css = getComputedStyle(row);
        return row.offsetHeight +
            parseInt(css.marginTop, 10) + parseInt(css.marginBottom, 10);
    }

    private dropdownRowTop() {
        return this.dropdownRow().getBoundingClientRect().top -
            (this.dd.getBoundingClientRect().top +
                parseInt(getComputedStyle(this.dd).paddingTop, 10));
    }
}
