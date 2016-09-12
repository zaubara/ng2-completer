import { Directive, ElementRef, EventEmitter, Host, HostListener, Input, Renderer, OnInit, Optional, Output } from "@angular/core";

import { CtrDropdown, CtrRowHighlight, CtrRowItem } from "./ctr-dropdown";

@Directive({
    selector: "[ctrRow]",
})
export class CtrRow implements CtrRowHighlight, OnInit {

    private selected = false;
    private _rowIndex: number;

    constructor( private el: ElementRef, private renderer: Renderer, @Host() private dropdown: CtrDropdown) {}
    
    public ngOnInit() {
        this.dropdown.registerRow(new CtrRowItem(this, this._rowIndex));
    }

    @Input()
    set ctrRow(index: number) {
        this._rowIndex = index;
    }

    // @HostListener("click", ["$event"]) public onClick(event: any) {
    //     console.log("click", event);
    // }

    @HostListener("mouseenter", ["$event"]) public onMouseEnter(event: any) {
        this.dropdown.highlightRow(this._rowIndex);
    }

    public setHighlited(selected: boolean) {
        this.selected = selected;
        this.renderer.setElementClass(this.el.nativeElement, "completer-selected-row", this.selected);
    }

    public getNativeElement() {
        return this.el.nativeElement;
    }
}
