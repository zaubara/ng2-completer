import { Directive, ElementRef, EventEmitter, Host, HostListener, Input, Renderer, Output } from "@angular/core";

import { CtrCompleter } from "./ctr-completer";

@Directive({
    selector: "[ctrRow]",
})
export class CtrRow {

    private selected = false;
    constructor( private el: ElementRef, private renderer: Renderer) { }


    // @HostListener("click", ["$event"]) public onClick(event: any) {
    //     console.log("click", event);
    // }

    @HostListener("mouseenter", ["$event"]) public onMouseEnter(event: any) {
        //console.log("mouseenter", event);
    }

    public setSelected(selected: boolean) {
        this.selected = selected;
        if (this.selected) {
            this.renderer.setElementClass(this.el.nativeElement, "completer-selected-row", true);
        }
    }
}
