"use strict";
import {Component, Input, Output, EventEmitter, OnInit, ViewChild} from "@angular/core";
import {Http, Response} from '@angular/http';
import {Subscription, Observable} from "rxjs";

import {AutocompleteListCmp} from "./autocomplete-list-cmp";
import {AutocompleteData} from "./services/autocomplete-data";

let template = require("./autocomplete-cmp.html");
let defaultStyles = require("./autocomplete-cmp.css");

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
const PAUSE = 250;
const BLUR_TIMEOUT = 200;

@Component({
    selector: "ng2-autocomplete",
    directives: [AutocompleteListCmp],
    template: template,
    styles: [defaultStyles]
})
export class AutocompleteCmp implements OnInit {
    @Input() dataService: AutocompleteData;
    @Input() searchFields = "";
    @Input() titleField = "";
    @Input() inputClass = "";
    @Input() pause = PAUSE;
    @Input() minlength = MIN_LENGTH;
    @Input() maxlength = MAX_LENGTH;
    @Input() overrideSuggestions = false;
    @Input() clearSelected = false;
    @Input() placeholder = "";
    @Input() remoteUrl: string = null;
    @Input() remoteUrlDataField: string = null;
    @Output("ng2AutocompleteOnSelect") public selected = new EventEmitter();

    @ViewChild(AutocompleteListCmp) listCmp: AutocompleteListCmp;

    private searchStr = "";
    private searching = false;
    private showDropdown = false;
    private searchTimer: number = null;
    private hideTimer: number = null;
    private displaySearching = true;
    private results: any[] = [];
    private selectedObject: any = null;
    private remoteSearch: Subscription;

    constructor(private http: Http) { }

    public keyupHandler(event: any) {
        if (event.keyCode === KEY_LF || event.keyCode === KEY_RT) {
            // do nothing
            return;
        }

        if (event.keyCode === KEY_UP || event.keyCode === KEY_EN) {
            event.preventDefault();
        }
        else if (event.keyCode === KEY_DW) {
            event.preventDefault();
            if (!this.showDropdown && this.searchStr && this.searchStr.length >= this.minlength) {
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

    public keydownHandler(event: any) {

        if (event.keyCode === KEY_EN && this.results) {
            if (this.listCmp.currentIndex >= 0 && this.listCmp.currentIndex < this.results.length) {
                event.preventDefault();
                this.selectResult(this.results[this.listCmp.currentIndex]);
            } else {
                this.handleOverrideSuggestions(event);
                this.clearResults();
            }
        } else if (event.keyCode === KEY_DW && this.results) {
            event.preventDefault();
            if (this.showDropdown && (this.listCmp.currentIndex + 1) < this.results.length) {
                this.listCmp.incIndex();
                this.searchStr = this.results[this.listCmp.currentIndex].title;
            }
        } else if (event.keyCode === KEY_UP && this.results) {
            event.preventDefault();
            if (this.showDropdown && this.listCmp.currentIndex >= 1) {
                this.listCmp.decIndex();
                this.searchStr = this.results[this.listCmp.currentIndex].title;
            }
            else if (this.showDropdown && this.listCmp.currentIndex === 0) {
                this.listCmp.unselect();
            }
        } else if (event.keyCode === KEY_TAB) {
            if (this.results && this.results.length > 0 && this.showDropdown) {
                if (this.listCmp.currentIndex === -1 && this.overrideSuggestions) {
                    // intentionally not sending event so that it does not
                    // prevent default tab behavior
                    this.handleOverrideSuggestions();
                }
                else {
                    if (this.listCmp.currentIndex === -1) {
                        this.listCmp.toTop();
                    }
                    this.selectResult(this.results[this.listCmp.currentIndex]);
                }
            }
            else {
                // no results
                // intentionally not sending event so that it does not
                // prevent default tab behavior
                if (this.searchStr && this.searchStr.length > 0) {
                    this.handleOverrideSuggestions();
                }
            }
        } else if (event.keyCode === KEY_ES) {
            // This is very specific to IE10/11 #272
            // without this, IE clears the input text
            event.preventDefault();
        }
    }

    public ngOnInit() {
        this.selected.subscribe(() => {
            this.clearResults();
        });
        this.dataService.subscribe(results => {
            this.results = results;
            this.showDropdown = true;
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
        this.callOrAssign(result);
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

        if (this.overrideSuggestions) {
            if (this.searchStr && this.searchStr.length > 0 && this.listCmp.currentIndex === -1) {
                this.handleOverrideSuggestions();
            }
        }
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
        this.dataService.search(str);
        // if (this.localData) {
        //     let matches: string[];
            // if (typeof scope.localSearch() !== 'undefined') {
            //   matches = scope.localSearch()(str, scope.localData);
            // } else {
            // matches = this.getLocalResults(str);
            // // }
            // this.searching = false;
            // this.processResults(matches, str);
            // }
            // }
            // else if (scope.remoteApiHandler) {
            //   getRemoteResultsWithCustomHandler(str);
        // } else {
        //     this.getRemoteResults(str);
        // }
    }

    // private getLocalResults(str: string) {
    //     let i: number;
    //     let match: boolean;
    //     let s: number;
    //     let value: string;
    //     let searchFields = this.searchFields.split(',');
    //     let matches: string[] = [];
    //     // if (typeof this.parseInput() !== 'undefined') {
    //     //   str = scope.parseInput()(str);
    //     // }
    //     for (i = 0; i < this.localData.length; i++) {
    //         match = false;

    //         for (s = 0; s < searchFields.length; s++) {
    //             value = this.extractValue(this.localData[i], searchFields[s]) || '';
    //             match = match || (value.toString().toLowerCase().indexOf(str.toString().toLowerCase()) >= 0);
    //         }

    //         if (match) {
    //             matches[matches.length] = this.localData[i];
    //         }
    //     }
    //     return matches;
    // }

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

    private handleOverrideSuggestions(event?: any) {
        if (this.overrideSuggestions &&
            !(this.selectedObject && this.selectedObject.originalObject === this.searchStr)) {
            if (event) {
                event.preventDefault();
            }

            // cancel search timer
            clearTimeout(this.searchTimer);
            // cancel http request
            // cancelHttpRequest();
            this.setInputString(this.searchStr);
        }
    }

    private setInputString(str: string) {
        this.callOrAssign({ originalObject: str });

        if (this.clearSelected) {
            this.searchStr = null;
        }
        this.clearResults();
    }

    private callOrAssign(value: any) {
        this.selectedObject = value;
        this.selected.emit(value);

        // if (value) {
        //   handleRequired(true);
        // }
        // else {
        //   handleRequired(false);
        // }
    }


    // TODO: do remote results in external service that can be replaced by a different provider
    private getRemoteResults(str: string) {
        var params = {},
            url = this.remoteUrl + encodeURIComponent(str);
        // if (scope.remoteUrlRequestFormatter) {
        //   params = {params: scope.remoteUrlRequestFormatter(str)};
        //   url = scope.remoteUrl;
        // }
        // if (!!scope.remoteUrlRequestWithCredentials) {
        //   params.withCredentials = true;
        // }
        this.remoteSearch =
            this.http.get(url)
                .map((res: Response) => res.json())
                .map((data: any) => this.extractValue(data, this.remoteUrlDataField))
                .catch(this.handleError)
                .subscribe((res: string[]) => {
                    this.searching = false;
                    this.processResults(res, str);
                });
    }

    private cancelHttpRequest() {
        this.remoteSearch.unsubscribe();
    }

    private handleError(error: any) {
        this.searching = false;
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        if (console && console.error) {
            console.error(errMsg); // log to console 
        }

        return Observable.throw(errMsg);
    }
}
