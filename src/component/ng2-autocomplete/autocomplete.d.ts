import { DynamicComponentLoader, EventEmitter, OnInit, ViewContainerRef } from "@angular/core";
export declare class AutocompleteDirective implements OnInit {
    private viewRef;
    private dcl;
    search: (term: string) => Promise<Array<{
        text: string;
        data: any;
    }>>;
    selected: EventEmitter<{}>;
    private term;
    private listCmp;
    private refreshTimer;
    private searchInProgress;
    private searchRequired;
    constructor(viewRef: ViewContainerRef, dcl: DynamicComponentLoader);
    onKey(event: any): void;
    ngOnInit(): void;
    private doSearch();
    private diplayList(list);
    private updateList(list);
    private removeList();
}
