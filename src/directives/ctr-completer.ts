import { Directive, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";


import { CompleterData } from "../components/ng2-completer/services/completer-data";
import { CompleterItem } from "../components/ng2-completer/completer-item";
import { MIN_SEARCH_LENGTH, PAUSE } from "../globals";


@Directive({
    selector: "[ctr-completer]",
})
export class CtrCompleter implements OnInit {
    @Input("minSearchLength") public minSearchLength = MIN_SEARCH_LENGTH;
    @Input("ctr-completer") public dataService: CompleterData;
    @Input("pause") public pause = PAUSE;
    @Input("autoMatch") public autoMatch = false;

    private searchTimer: number = null;
    private searching = false;
    private results: CompleterItem[] = [];
    private term = "";

    constructor() { }

    public ngOnInit() {
        if (this.dataService) {
            this.dataService
            .catch(err => this.handleError(err))
            .subscribe(results => {
                this.searching = false;
                this.results = results;
                if (this.autoMatch && this.results.length === 1 &&
                    this.results[0].title.toLocaleLowerCase() === this.term.toLocaleLowerCase()) {
                        // Do automatch
                }
                console.log("1", this.results);
            });
        }
    }

    public search(term: string) {
        if (term.length >= this.minSearchLength) {
            if (this.searchTimer) {
                clearTimeout(this.searchTimer);
            }

            this.searching = true;

            this.searchTimer = setTimeout(
                () => {
                    this.searchTimerComplete(term);
                },
                this.pause
            );
        }
    }

    public clear() {
        console.log(`clear`);
        if (this.searchTimer) {
            clearTimeout(this.searchTimer);
        }
        this.results = [];
    }

    public selectCurrent() {
        console.log(`selectCurrent`);
    }

    public nextRow() {
        console.log(`nextRow`);
    }

    public prevRow() {
        console.log(`prevRow`);
    }

    private searchTimerComplete(str: string) {
        // Begin the search
        if (!str || str.length < this.minSearchLength) {
            return;
        }
        this.dataService.search(str);
    }

    private handleError(error: any) {
        this.searching = false;
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : "Server error";
        if (console && console.error) {
            console.error(errMsg); // log to console 
        }

        return Observable.throw(errMsg);
    }

}
