"use strict";
import {Component, Input, ComponentRef, Output, EventEmitter, OnInit, ViewContainerRef} from "@angular/core";
import {Ng2AutocompleteListCmp} from "./ng2-autocomplete-list-cmp";

let template = require("./ng2-autocomplete-cmp.html");
let defaultStyles = require("./ng2-autocomplete-cmp.css");

// keyboard events
const KEY_DW = 40;
const KEY_RT = 39;
const KEY_UP = 38;
const KEY_LF = 37;
const KEY_ES = 27;
const KEY_EN = 13;
const KEY_TAB = 9;

const MIN_LENGTH = 3;
const MAX_LENGTH = 524288;  // the default max length per the html maxlength attribute
const PAUSE = 500;
const BLUR_TIMEOUT = 200;

@Component({
    selector: "ng2-autocomplete",
    directives: [Ng2AutocompleteListCmp],
    template: template,
    styles: [defaultStyles]
})
export class Ng2AutocompleteCmp implements OnInit {
    @Input() localData: any[];
    @Input() searchFields = "";
    @Input() titleField = "";
    @Input() inputClass = "";
    @Output("ng2AutocompleteOnSelect") public selected = new EventEmitter();

    private searchStr = "";
    private searching = false;
    private showDropdown = false;
    private minlength = MIN_LENGTH;
    private searchTimer: number = null;
    private hideTimer: number = null;
    private pause = PAUSE;
    private displaySearching = true;
    private results: any[] = [];

    public onKey(event: any) {
        if (event.keyCode === KEY_LF || event.keyCode === KEY_RT) {
            // do nothing
            return;
        }

        if (event.keyCode === KEY_UP || event.keyCode === KEY_EN) {
            event.preventDefault();
        }
        else if (event.keyCode === KEY_DW) {
            event.preventDefault();
            if (this.searchStr) {
                this.initResults();
                this.searching = true;
                this.searchTimerComplete(this.searchStr);
            }
        }
        else if (event.keyCode === KEY_ES) {
            this.clearResults();
        }
        else {
            if (!this.searchStr) {
                return;
            }

            if (this.searchStr === '') {
                this.showDropdown = false;
            }
            else if (this.searchStr.length >= this.minlength) {
                this.initResults();

                if (this.searchTimer) {
                    clearTimeout(this.searchTimer);
                }

                this.searching = true;

                this.searchTimer = setTimeout(() => {
                    this.searchTimerComplete(this.searchStr);
                }, this.pause);
            }
        }

    }

    public ngOnInit() {
        this.selected.subscribe(() => {
            this.clearResults();
        });
    }

    public selectResult(result: any) {
        // Restore original values
        // if (this.matchClass) {
        //   result.title = extractTitle(result.originalObject);
        //   result.description = extractValue(result.originalObject, this.descriptionField);
        // }

        // if (this.clearSelected) {
        //   this.searchStr = null;
        // }
        // else {
        this.searchStr = result.title;
        // }
        this.selected.emit(result);
        // this.callOrAssign(result);
        this.clearResults();
    };

    public hideResults() {
        // if (mousedownOn &&
        //     (mousedownOn === scope.id + '_dropdown' ||
        //      mousedownOn.indexOf('angucomplete') >= 0)) {
        //   mousedownOn = null;
        // }
        // else {
        this.hideTimer = setTimeout(() => {
            this.clearResults();
        }, BLUR_TIMEOUT);
        //   cancelHttpRequest();

        //   if (scope.focusOut) {
        //     scope.focusOut();
        //   }

        //   if (scope.overrideSuggestions) {
        //     if (scope.searchStr && scope.searchStr.length > 0 && scope.currentIndex === -1) {
        //       handleOverrideSuggestions();
        //     }
        //   }
        // }
    };

    private initResults() {
        this.showDropdown = this.displaySearching;
        this.results = [];
    }

    private searchTimerComplete(str: string) {
        // Begin the search
        if (!str || str.length < this.minlength) {
            return;
        }
        if (this.localData) {
            let matches: string[];
            // if (typeof scope.localSearch() !== 'undefined') {
            //   matches = scope.localSearch()(str, scope.localData);
            // } else {
            matches = this.getLocalResults(str);
            // }
            this.searching = false;
            this.processResults(matches, str);
        }
        // }
        // else if (scope.remoteApiHandler) {
        //   getRemoteResultsWithCustomHandler(str);
        // } else {
        //   getRemoteResults(str);
        // }
    }

    private getLocalResults(str: string) {
        let i: number;
        let match: boolean;
        let s: number;
        let value: string;
        let searchFields = this.searchFields.split(',');
        let matches: string[] = [];
        // if (typeof this.parseInput() !== 'undefined') {
        //   str = scope.parseInput()(str);
        // }
        for (i = 0; i < this.localData.length; i++) {
            match = false;

            for (s = 0; s < searchFields.length; s++) {
                value = this.extractValue(this.localData[i], searchFields[s]) || '';
                match = match || (value.toString().toLowerCase().indexOf(str.toString().toLowerCase()) >= 0);
            }

            if (match) {
                matches[matches.length] = this.localData[i];
            }
        }
        return matches;
    }

    private processResults(responseData: string[], str: string) {
        let i: number;
        let description: string;
        let image: string;
        let text: string;
        let formattedText: string;
        let formattedDesc: string;

        if (responseData && responseData.length > 0) {
            this.results = [];

            for (i = 0; i < responseData.length; i++) {
                if (this.titleField && this.titleField !== '') {
                    text = formattedText = this.extractTitle(responseData[i]);
                }

                // description = '';
                // if (scope.descriptionField) {
                //   description = formattedDesc = extractValue(responseData[i], scope.descriptionField);
                // }

                // image = '';
                // if (scope.imageField) {
                //   image = extractValue(responseData[i], scope.imageField);
                // }

                // if (scope.matchClass) {
                //   formattedText = findMatchString(text, str);
                //   formattedDesc = findMatchString(description, str);
                // }

                this.results[this.results.length] = {
                    title: formattedText,
                    description: formattedDesc,
                    image: image,
                    originalObject: responseData[i]
                };
            }

        } else {
            this.results = [];
        }

        // if (scope.autoMatch && scope.results.length === 1 &&
        //     checkExactMatch(scope.results[0],
        //       {title: text, desc: description || ''}, scope.searchStr)) {
        //   scope.showDropdown = false;
        // } else if (scope.results.length === 0 && !displayNoResults) {
        //   scope.showDropdown = false;
        // } else {
        this.showDropdown = true;
        // }
    }


    private extractValue(obj: any, key: string) {
        let keys: string[];
        let result: any;
        if (key) {
            keys = key.split('.');
            result = obj;
            for (var i = 0; i < keys.length; i++) {
                result = result[keys[i]];
            }
        }
        else {
            result = obj;
        }
        return result;
    }

    private extractTitle(data: any) {
        // split title fields and run extractValue for each and join with ' '
        return this.titleField.split(',')
            .map((field) => {
                return this.extractValue(data, field);
            })
            .join(' ');
    }


    private clearResults() {
        this.results = [];
        this.showDropdown = false;
    }
}
