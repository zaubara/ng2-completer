import { Directive, EventEmitter, Host, HostListener, Input, Output } from "@angular/core";

import { CtrCompleter } from "./ctr-completer";


@Directive({
    selector: "[ctrDropdown]",
})
export class CtrDropdown {


    constructor( @Host() private completer: CtrCompleter) { }


    @HostListener("click", ["$event"]) public onClick(event: any) {
        console.log("click", event);
    }

    @HostListener("mouseenter", ["$event"]) public onMouseEnter(event: any) {
        console.log("mouseenter", event);
    }
}
