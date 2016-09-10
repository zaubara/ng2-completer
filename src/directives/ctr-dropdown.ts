import { ContentChildren, Directive, EventEmitter, Host, HostListener, Input, Output, QueryList } from "@angular/core";

import { CtrCompleter } from "./ctr-completer";
import { CtrRow } from "./ctr-row";


@Directive({
    selector: "[ctrDropdown]",
})
export class CtrDropdown {

     @ContentChildren(CtrRow) children:QueryList<CtrRow>;
    // constructor( @Host() private completer: CtrCompleter) { }


    @HostListener("click", ["$event"]) public onClick(event: any) {
        this.children.toArray()[0].setSelected(true);
    }

    // @HostListener("mouseenter", ["$event"]) public onMouseEnter(event: any) {
    //     console.log("mouseenter", event);
    // }
}
