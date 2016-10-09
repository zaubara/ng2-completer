webpackJsonp([1],{

/***/ 102:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var ng2_completer_module_1 = __webpack_require__(272);
exports.Ng2CompleterModule = ng2_completer_module_1.Ng2CompleterModule;
var completer_service_1 = __webpack_require__(131);
exports.CompleterService = completer_service_1.CompleterService;
var local_data_1 = __webpack_require__(87);
exports.LocalData = local_data_1.LocalData;
var remote_data_1 = __webpack_require__(88);
exports.RemoteData = remote_data_1.RemoteData;
var completer_base_data_1 = __webpack_require__(86);
exports.CompleterBaseData = completer_base_data_1.CompleterBaseData;
var ctr_completer_1 = __webpack_require__(40);
exports.CtrCompleter = ctr_completer_1.CtrCompleter;
var ctr_dropdown_1 = __webpack_require__(89);
exports.CtrDropdown = ctr_dropdown_1.CtrDropdown;
var ctr_input_1 = __webpack_require__(132);
exports.CtrInput = ctr_input_1.CtrInput;
var ctr_list_1 = __webpack_require__(133);
exports.CtrList = ctr_list_1.CtrList;
var ctr_row_1 = __webpack_require__(134);
exports.CtrRow = ctr_row_1.CtrRow;


/***/ },

/***/ 111:
/***/ function(module, exports) {

"use strict";
"use strict";
exports.MAX_CHARS = 524288; // the default max length per the html maxlength attribute
exports.MIN_SEARCH_LENGTH = 3;
exports.PAUSE = 250;
exports.TEXT_SEARCHING = "Searching...";
exports.TEXT_NORESULTS = "No results found";


/***/ },

/***/ 1134:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(102);


/***/ },

/***/ 131:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = __webpack_require__(0);
var local_data_1 = __webpack_require__(87);
var remote_data_1 = __webpack_require__(88);
var CompleterService = (function () {
    function CompleterService(localDataFactory, // Using any instead of () => LocalData because on AoT errors
        remoteDataFactory // Using any instead of () => LocalData because on AoT errors
        ) {
        this.localDataFactory = localDataFactory;
        this.remoteDataFactory = remoteDataFactory;
    }
    CompleterService.prototype.local = function (data, searchFields, titleField) {
        var localData = this.localDataFactory();
        return localData
            .data(data)
            .searchFieldss(searchFields)
            .titleField(titleField);
    };
    CompleterService.prototype.remote = function (url, searchFields, titleField) {
        var remoteData = this.remoteDataFactory();
        return remoteData
            .remoteUrl(url)
            .searchFieldss(searchFields)
            .titleField(titleField);
    };
    CompleterService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(local_data_1.LocalData)),
        // Using any instead of () => LocalData because on AoT errors
        __param(1, core_1.Inject(remote_data_1.RemoteData)), 
        __metadata('design:paramtypes', [Object, Object])
    ], CompleterService);
    return CompleterService;
}());
exports.CompleterService = CompleterService;


/***/ },

/***/ 132:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = __webpack_require__(0);
var ctr_completer_1 = __webpack_require__(40);
// keyboard events
var KEY_DW = 40;
var KEY_RT = 39;
var KEY_UP = 38;
var KEY_LF = 37;
var KEY_ES = 27;
var KEY_EN = 13;
var KEY_TAB = 9;
var CtrInput = (function () {
    function CtrInput(completer) {
        var _this = this;
        this.completer = completer;
        this.clearSelected = false;
        this.overrideSuggested = false;
        this.ngModelChange = new core_1.EventEmitter();
        this._searchStr = "";
        this._displayStr = "";
        this.completer.selected.subscribe(function (item) {
            if (_this.clearSelected) {
                _this.searchStr = "";
            }
            else {
                _this.searchStr = item.title;
            }
            _this.ngModelChange.emit(_this.searchStr);
        });
        this.completer.highlighted.subscribe(function (item) {
            _this._displayStr = item.title;
            _this.ngModelChange.emit(item.title);
        });
    }
    CtrInput.prototype.onInputChange = function (event) {
        this.searchStr = event.target.value;
    };
    CtrInput.prototype.keyupHandler = function (event) {
        if (event.keyCode === KEY_LF || event.keyCode === KEY_RT || event.keyCode === KEY_TAB) {
            // do nothing
            return;
        }
        if (event.keyCode === KEY_UP || event.keyCode === KEY_EN) {
            event.preventDefault();
        }
        else if (event.keyCode === KEY_DW) {
            event.preventDefault();
            this.completer.search(this.searchStr);
        }
        else if (event.keyCode === KEY_ES) {
            this._searchStr = this._displayStr;
            this.completer.clear();
        }
        else {
            if (!this.searchStr) {
                this.completer.clear();
                return;
            }
            this.completer.search(this.searchStr);
        }
    };
    CtrInput.prototype.keydownHandler = function (event) {
        if (event.keyCode === KEY_EN) {
            this.completer.selectCurrent();
        }
        else if (event.keyCode === KEY_DW) {
            event.preventDefault();
            this.completer.nextRow();
        }
        else if (event.keyCode === KEY_UP) {
            event.preventDefault();
            this.completer.prevRow();
        }
        else if (event.keyCode === KEY_TAB) {
            if (this.overrideSuggested) {
                this.completer.onSelected({ title: this.searchStr, originalObject: null });
            }
            else {
                this.completer.selectCurrent();
            }
        }
        else if (event.keyCode === KEY_ES) {
            // This is very specific to IE10/11 #272
            // without this, IE clears the input text
            event.preventDefault();
        }
    };
    CtrInput.prototype.onBlur = function (event) {
        var _this = this;
        if (this.overrideSuggested) {
            this.completer.onSelected({ title: this.searchStr, originalObject: null });
        }
        else {
            setTimeout(function () {
                _this.completer.clear();
            }, 200);
        }
    };
    Object.defineProperty(CtrInput.prototype, "searchStr", {
        get: function () {
            return this._searchStr;
        },
        set: function (term) {
            this._searchStr = term;
            this._displayStr = term;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input("clearSelected"), 
        __metadata('design:type', Object)
    ], CtrInput.prototype, "clearSelected", void 0);
    __decorate([
        core_1.Input("overrideSuggested"), 
        __metadata('design:type', Object)
    ], CtrInput.prototype, "overrideSuggested", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], CtrInput.prototype, "ngModelChange", void 0);
    __decorate([
        core_1.HostListener("input", ["$event"]), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], CtrInput.prototype, "onInputChange", null);
    __decorate([
        core_1.HostListener("keyup", ["$event"]), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], CtrInput.prototype, "keyupHandler", null);
    __decorate([
        core_1.HostListener("keydown", ["$event"]), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], CtrInput.prototype, "keydownHandler", null);
    __decorate([
        core_1.HostListener("blur", ["$event"]), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], CtrInput.prototype, "onBlur", null);
    CtrInput = __decorate([
        core_1.Directive({
            selector: "[ctrInput]",
        }),
        __param(0, core_1.Host()), 
        __metadata('design:paramtypes', [ctr_completer_1.CtrCompleter])
    ], CtrInput);
    return CtrInput;
}());
exports.CtrInput = CtrInput;


/***/ },

/***/ 133:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = __webpack_require__(0);
var Observable_1 = __webpack_require__(1);
var ctr_completer_1 = __webpack_require__(40);
var globals_1 = __webpack_require__(111);
var CtrListContext = (function () {
    function CtrListContext(results, searching, searchInitialized) {
        this.results = results;
        this.searching = searching;
        this.searchInitialized = searchInitialized;
    }
    return CtrListContext;
}());
exports.CtrListContext = CtrListContext;
var CtrList = (function () {
    function CtrList(completer, templateRef, viewContainer) {
        this.completer = completer;
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.ctrListMinSearchLength = globals_1.MIN_SEARCH_LENGTH;
        this.ctrListPause = globals_1.PAUSE;
        this.ctrListAutoMatch = false;
        // private results: CompleterItem[] = [];
        this.term = null;
        // private searching = false;
        this.searchTimer = null;
        this.ctx = new CtrListContext([], false, false);
    }
    CtrList.prototype.ngOnInit = function () {
        this.completer.registerList(this);
        this.viewContainer.createEmbeddedView(this.templateRef, new CtrListContext([], false, false));
    };
    Object.defineProperty(CtrList.prototype, "dataService", {
        set: function (newService) {
            var _this = this;
            this._dataService = newService;
            if (this._dataService) {
                this._dataService
                    .catch(function (err) { return _this.handleError(err); })
                    .subscribe(function (results) {
                    _this.ctx.searchInitialized = true;
                    _this.ctx.searching = false;
                    _this.ctx.results = results;
                    if (_this.ctrListAutoMatch && results.length === 1 &&
                        results[0].title.toLocaleLowerCase() === _this.term.toLocaleLowerCase()) {
                        // Do automatch
                        _this.completer.onSelected(results[0]);
                    }
                    _this.refreshTemplate();
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    CtrList.prototype.search = function (term) {
        var _this = this;
        if (term && term.length >= this.ctrListMinSearchLength && this.term !== term) {
            if (this.searchTimer) {
                clearTimeout(this.searchTimer);
            }
            if (!this.ctx.searching) {
                this.ctx.results = [];
                this.ctx.searching = true;
                this.ctx.searchInitialized = true;
                this.refreshTemplate();
            }
            this.searchTimer = setTimeout(function () {
                _this.searchTimerComplete(term);
            }, this.ctrListPause);
        }
    };
    CtrList.prototype.clear = function () {
        if (this.searchTimer) {
            clearTimeout(this.searchTimer);
        }
        if (this.dataService) {
            this.dataService.cancel();
        }
        this.ctx.results = [];
        this.ctx.searchInitialized = false;
        this.term = null;
        this.viewContainer.clear();
    };
    CtrList.prototype.searchTimerComplete = function (term) {
        // Begin the search
        if (!term || term.length < this.ctrListMinSearchLength) {
            this.ctx.searching = false;
            return;
        }
        this.term = term;
        this._dataService.search(term);
    };
    CtrList.prototype.handleError = function (error) {
        this.ctx.searching = false;
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : "Server error";
        if (console && console.error) {
            console.error(errMsg); // log to console 
        }
        this.refreshTemplate();
        return Observable_1.Observable.throw(errMsg);
    };
    CtrList.prototype.refreshTemplate = function () {
        // Recreate the template
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.templateRef, this.ctx);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CtrList.prototype, "ctrListMinSearchLength", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CtrList.prototype, "ctrListPause", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CtrList.prototype, "ctrListAutoMatch", void 0);
    __decorate([
        core_1.Input("ctrList"), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], CtrList.prototype, "dataService", null);
    CtrList = __decorate([
        core_1.Directive({
            selector: "[ctrList]",
        }),
        __param(0, core_1.Host()), 
        __metadata('design:paramtypes', [ctr_completer_1.CtrCompleter, core_1.TemplateRef, core_1.ViewContainerRef])
    ], CtrList);
    return CtrList;
}());
exports.CtrList = CtrList;


/***/ },

/***/ 134:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = __webpack_require__(0);
var ctr_dropdown_1 = __webpack_require__(89);
var CtrRow = (function () {
    function CtrRow(el, renderer, dropdown) {
        this.el = el;
        this.renderer = renderer;
        this.dropdown = dropdown;
        this.selected = false;
    }
    CtrRow.prototype.ngOnInit = function () {
        this.dropdown.registerRow(new ctr_dropdown_1.CtrRowItem(this, this._rowIndex));
    };
    Object.defineProperty(CtrRow.prototype, "ctrRow", {
        set: function (index) {
            this._rowIndex = index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CtrRow.prototype, "dataItem", {
        set: function (item) {
            this._item = item;
        },
        enumerable: true,
        configurable: true
    });
    CtrRow.prototype.onClick = function (event) {
        this.dropdown.onSelected(this._item);
    };
    CtrRow.prototype.onMouseEnter = function (event) {
        this.dropdown.highlightRow(this._rowIndex);
    };
    CtrRow.prototype.setHighlited = function (selected) {
        this.selected = selected;
        this.renderer.setElementClass(this.el.nativeElement, "completer-selected-row", this.selected);
    };
    CtrRow.prototype.getNativeElement = function () {
        return this.el.nativeElement;
    };
    CtrRow.prototype.getDataItem = function () {
        return this._item;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], CtrRow.prototype, "ctrRow", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], CtrRow.prototype, "dataItem", null);
    __decorate([
        core_1.HostListener("click", ["$event"]), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], CtrRow.prototype, "onClick", null);
    __decorate([
        core_1.HostListener("mouseenter", ["$event"]), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], CtrRow.prototype, "onMouseEnter", null);
    CtrRow = __decorate([
        core_1.Directive({
            selector: "[ctrRow]",
        }),
        __param(2, core_1.Host()), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer, ctr_dropdown_1.CtrDropdown])
    ], CtrRow);
    return CtrRow;
}());
exports.CtrRow = CtrRow;


/***/ },

/***/ 269:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var forms_1 = __webpack_require__(39);
var ctr_completer_1 = __webpack_require__(40);
var globals_1 = __webpack_require__(111);
__webpack_require__(100);
var noop = function () { };
var COMPLETER_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return CompleterCmp; }),
    multi: true
};
var CompleterCmp = (function () {
    function CompleterCmp() {
        this.inputName = "";
        this.pause = globals_1.PAUSE;
        this.minSearchLength = globals_1.MIN_SEARCH_LENGTH;
        this.maxChars = globals_1.MAX_CHARS;
        this.overrideSuggested = false;
        this.clearSelected = false;
        this.placeholder = "";
        this.textSearching = globals_1.TEXT_SEARCHING;
        this.textNoResults = globals_1.TEXT_NORESULTS;
        this.autoMatch = false;
        this.disableInput = false;
        this.selected = new core_1.EventEmitter();
        this.highlighted = new core_1.EventEmitter();
        this.blur = new core_1.EventEmitter();
        this.displaySearching = true;
        this.searchStr = "";
        this._onTouchedCallback = noop;
        this._onChangeCallback = noop;
    }
    Object.defineProperty(CompleterCmp.prototype, "value", {
        get: function () { return this.searchStr; },
        set: function (v) {
            if (v !== this.searchStr) {
                this.searchStr = v;
                this._onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    CompleterCmp.prototype.onTouched = function () {
        this._onTouchedCallback();
    };
    CompleterCmp.prototype.writeValue = function (value) {
        this.searchStr = value;
    };
    CompleterCmp.prototype.registerOnChange = function (fn) {
        this._onChangeCallback = fn;
    };
    CompleterCmp.prototype.registerOnTouched = function (fn) {
        this._onTouchedCallback = fn;
    };
    CompleterCmp.prototype.ngOnInit = function () {
        var _this = this;
        this.completer.selected.subscribe(function (item) {
            _this.selected.emit(item);
            _this._onChangeCallback(item.title);
        });
        this.completer.highlighted.subscribe(function (item) {
            _this.highlighted.emit(item);
        });
        if (this.textSearching === "false") {
            this.displaySearching = false;
        }
    };
    CompleterCmp.prototype.onBlur = function () {
        this.blur.emit();
        this.onTouched();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CompleterCmp.prototype, "dataService", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CompleterCmp.prototype, "inputName", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CompleterCmp.prototype, "pause", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CompleterCmp.prototype, "minSearchLength", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CompleterCmp.prototype, "maxChars", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CompleterCmp.prototype, "overrideSuggested", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CompleterCmp.prototype, "clearSelected", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CompleterCmp.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CompleterCmp.prototype, "matchClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CompleterCmp.prototype, "textSearching", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CompleterCmp.prototype, "textNoResults", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CompleterCmp.prototype, "fieldTabindex", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CompleterCmp.prototype, "autoMatch", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CompleterCmp.prototype, "disableInput", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CompleterCmp.prototype, "selected", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CompleterCmp.prototype, "highlighted", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CompleterCmp.prototype, "blur", void 0);
    __decorate([
        core_1.ViewChild(ctr_completer_1.CtrCompleter), 
        __metadata('design:type', ctr_completer_1.CtrCompleter)
    ], CompleterCmp.prototype, "completer", void 0);
    CompleterCmp = __decorate([
        core_1.Component({
            selector: "ng2-completer",
            template: __webpack_require__(303),
            styles: [__webpack_require__(302)],
            providers: [COMPLETER_CONTROL_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [])
    ], CompleterCmp);
    return CompleterCmp;
}());
exports.CompleterCmp = CompleterCmp;


/***/ },

/***/ 270:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var CompleterListItemCmp = (function () {
    function CompleterListItemCmp() {
        this.parts = [];
    }
    CompleterListItemCmp.prototype.ngOnInit = function () {
        var matchStr = this.text.toLowerCase();
        var matchPos = matchStr.indexOf(this.searchStr.toLowerCase());
        var startIndex = 0;
        while (matchPos >= 0) {
            var matchText = this.text.slice(matchPos, matchPos + this.searchStr.length);
            if (matchPos === 0) {
                this.parts.push({ isMatch: true, text: matchText });
                startIndex += this.searchStr.length;
            }
            else if (matchPos > 0) {
                var matchPart = this.text.slice(startIndex, matchPos);
                this.parts.push({ isMatch: false, text: matchPart });
                this.parts.push({ isMatch: true, text: matchText });
                startIndex += this.searchStr.length + matchPart.length;
            }
            matchPos = matchStr.indexOf(this.searchStr.toLowerCase(), startIndex);
        }
        if (startIndex < this.text.length) {
            this.parts.push({ isMatch: false, text: this.text.slice(startIndex, this.text.length) });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CompleterListItemCmp.prototype, "text", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CompleterListItemCmp.prototype, "searchStr", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CompleterListItemCmp.prototype, "matchClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CompleterListItemCmp.prototype, "type", void 0);
    CompleterListItemCmp = __decorate([
        core_1.Component({
            selector: "completer-list-item",
            template: __webpack_require__(304)
        }), 
        __metadata('design:paramtypes', [])
    ], CompleterListItemCmp);
    return CompleterListItemCmp;
}());
exports.CompleterListItemCmp = CompleterListItemCmp;


/***/ },

/***/ 271:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var http_1 = __webpack_require__(49);
var local_data_1 = __webpack_require__(87);
var remote_data_1 = __webpack_require__(88);
function localDataFactory() {
    return function () {
        return new local_data_1.LocalData();
    };
}
exports.localDataFactory = localDataFactory;
function remoteDataFactory(http) {
    return function () {
        return new remote_data_1.RemoteData(http);
    };
}
exports.remoteDataFactory = remoteDataFactory;
exports.LocalDataFactoryProvider = { provide: local_data_1.LocalData, useFactory: localDataFactory };
exports.RemoteDataFactoryProvider = { provide: remote_data_1.RemoteData, useFactory: remoteDataFactory, deps: [http_1.Http] };


/***/ },

/***/ 272:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var forms_1 = __webpack_require__(39);
var http_1 = __webpack_require__(49);
var completer_cmp_1 = __webpack_require__(269);
var completer_list_item_cmp_1 = __webpack_require__(270);
var completer_service_1 = __webpack_require__(131);
var completer_data_factory_1 = __webpack_require__(271);
var ctr_completer_1 = __webpack_require__(40);
var ctr_dropdown_1 = __webpack_require__(89);
var ctr_input_1 = __webpack_require__(132);
var ctr_list_1 = __webpack_require__(133);
var ctr_row_1 = __webpack_require__(134);
var common_1 = __webpack_require__(32);
var Ng2CompleterModule = (function () {
    function Ng2CompleterModule() {
    }
    Ng2CompleterModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                http_1.HttpModule
            ],
            declarations: [
                completer_list_item_cmp_1.CompleterListItemCmp,
                ctr_completer_1.CtrCompleter,
                ctr_dropdown_1.CtrDropdown,
                ctr_input_1.CtrInput,
                ctr_list_1.CtrList,
                ctr_row_1.CtrRow,
                completer_cmp_1.CompleterCmp,
            ],
            exports: [
                completer_cmp_1.CompleterCmp,
                completer_list_item_cmp_1.CompleterListItemCmp,
                ctr_completer_1.CtrCompleter,
                ctr_dropdown_1.CtrDropdown,
                ctr_input_1.CtrInput,
                ctr_list_1.CtrList,
                ctr_row_1.CtrRow
            ],
            providers: [
                completer_service_1.CompleterService,
                completer_data_factory_1.LocalDataFactoryProvider,
                completer_data_factory_1.RemoteDataFactoryProvider
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], Ng2CompleterModule);
    return Ng2CompleterModule;
}());
exports.Ng2CompleterModule = Ng2CompleterModule;


/***/ },

/***/ 302:
/***/ function(module, exports) {

module.exports = ".completer-dropdown {\n    border-color: #ececec;\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 2px;\n    width: 250px;\n    padding: 6px;\n    cursor: pointer;\n    z-index: 9999;\n    position: absolute;\n    margin-top: -6px;\n    background-color: #ffffff;\n}\n\n.completer-row {\n    padding: 5px;\n    color: #000000;\n    margin-bottom: 4px;\n    clear: both;\n    display: inline-block;\n    width: 103%;\n}\n\n.completer-selected-row {\n    background-color: lightblue;\n    color: #ffffff;\n}\n\n.completer-description {\n    font-size: 14px;\n}\n\n.completer-image-default {\n    width: 16px; \n    height: 16px;\n    background-image: url(\"demo/res/img/default.png\");\n}\n\n.completer-image-holder {\n    float: left;\n    width: 10%;\n}\n.completer-item-text-image {\n    float: right;\n    width: 90%;\n}"

/***/ },

/***/ 303:
/***/ function(module, exports) {

module.exports = "<div class=\"completer-holder\" ctrCompleter>\n    <input class=\"completer-input\" ctrInput [(ngModel)]=\"searchStr\" [attr.name]=\"inputName\" [placeholder]=\"placeholder\" [attr.maxlength]=\"maxChars\"\n        [tabindex]=\"fieldTabindex\" [disabled]=\"disableInput\" [clearSelected]=\"clearSelected\" [overrideSuggested]=\"overrideSuggested\" (blur)=\"onBlur()\"\n        autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" />\n\n    <div class=\"completer-dropdown-holder\" *ctrList=\"dataService; minSearchLength: minSearchLength; pause: pause; autoMatch: autoMatch; let items = results; let searchActive = searching; let isInitialized = searchInitialized;\">\n        <div class=\"completer-dropdown\" ctrDropdown *ngIf=\"isInitialized\">\n            <div *ngIf=\"searchActive && displaySearching\" class=\"completer-searching\">{{textSearching}}</div>\n            <div *ngIf=\"!searchActive && (!items || items.length === 0)\" class=\"completer-no-results\">{{textNoResults}}</div>\n            <div class=\"completer-row-wrapper\" *ngFor=\"let item of items; let rowIndex=index\">\n                <div class=\"completer-row\" [ctrRow]=\"rowIndex\" [dataItem]=\"item\">\n                    <div *ngIf=\"item.image || item.image === ''\" class=\"completer-image-holder\">\n                        <img *ngIf=\"item.image != ''\" src=\"{{item.image}}\" class=\"completer-image\" />\n                        <div *ngIf=\"item.image === ''\" class=\"completer-image-default\"></div>\n                    </div>\n                    <div class=\"completer-item-text\" [ngClass]=\"{'completer-item-text-image': item.image || item.image === '' }\">\n                        <completer-list-item class=\"completer-title\" [text]=\"item.title\" [matchClass]=\"matchClass\" [searchStr]=\"searchStr\" [type]=\"'title'\"></completer-list-item>\n                        <completer-list-item *ngIf=\"item.description && item.description != ''\" class=\"completer-description\" [text]=\"item.description\"\n                            [matchClass]=\"matchClass\" [searchStr]=\"searchStr\" [type]=\"'description'\">\n                        </completer-list-item>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ },

/***/ 304:
/***/ function(module, exports) {

module.exports = "<span class=\"completer-list-item-holder\" [ngClass]=\"{'completer-title': type === 'title', 'completer-description': type === 'description'}\" >\n    <span class=\"completer-list-item\" *ngFor=\"let part of parts\" [ngClass]=\"part.isMatch ? matchClass : null\">{{part.text}}</span>\n</span>"

/***/ },

/***/ 40:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var CtrCompleter = (function () {
    function CtrCompleter() {
        this.selected = new core_1.EventEmitter();
        this.highlighted = new core_1.EventEmitter();
    }
    CtrCompleter.prototype.ngOnInit = function () {
        //
    };
    CtrCompleter.prototype.registerList = function (list) {
        this.list = list;
    };
    CtrCompleter.prototype.registerDropdown = function (dropdown) {
        this.dropdown = dropdown;
    };
    CtrCompleter.prototype.onHighlighted = function (item) {
        this.highlighted.emit(item);
    };
    CtrCompleter.prototype.onSelected = function (item) {
        this.selected.emit(item);
        this.clear();
    };
    CtrCompleter.prototype.search = function (term) {
        if (this.list) {
            this.list.search(term);
        }
    };
    CtrCompleter.prototype.clear = function () {
        if (this.dropdown) {
            this.dropdown.clear();
        }
        if (this.list) {
            this.list.clear();
        }
    };
    CtrCompleter.prototype.selectCurrent = function () {
        if (this.dropdown) {
            this.dropdown.selectCurrent();
        }
    };
    CtrCompleter.prototype.nextRow = function () {
        if (this.dropdown) {
            this.dropdown.nextRow();
        }
    };
    CtrCompleter.prototype.prevRow = function () {
        if (this.dropdown) {
            this.dropdown.prevRow();
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CtrCompleter.prototype, "selected", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CtrCompleter.prototype, "highlighted", void 0);
    CtrCompleter = __decorate([
        core_1.Directive({
            selector: "[ctrCompleter]",
        }), 
        __metadata('design:paramtypes', [])
    ], CtrCompleter);
    return CtrCompleter;
}());
exports.CtrCompleter = CtrCompleter;


/***/ },

/***/ 86:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = __webpack_require__(13);
var CompleterBaseData = (function (_super) {
    __extends(CompleterBaseData, _super);
    function CompleterBaseData() {
        _super.call(this);
    }
    CompleterBaseData.prototype.cancel = function () { };
    CompleterBaseData.prototype.searchFieldss = function (searchFields) {
        this._searchFields = searchFields;
        return this;
    };
    CompleterBaseData.prototype.titleField = function (titleField) {
        this._titleField = titleField;
        return this;
    };
    CompleterBaseData.prototype.descriptionField = function (descriptionField) {
        this._descriptionField = descriptionField;
        return this;
    };
    CompleterBaseData.prototype.imageField = function (imageField) {
        this._imageField = imageField;
        return this;
    };
    CompleterBaseData.prototype.extractMatches = function (data, term) {
        var matches = [];
        if (this._searchFields && this._searchFields != "") {
            var searchFields = this._searchFields.split(",");
            for (var i = 0; i < data.length; i++) {
                var match = false;
                for (var s = 0; s < searchFields.length; s++) {
                    var value = this.extractValue(data[i], searchFields[s]) || "";
                    match = match || (value.toString().toLowerCase().indexOf(term.toString().toLowerCase()) >= 0);
                }
                if (match) {
                    matches[matches.length] = data[i];
                }
            }
        }
        else {
            matches = data;
        }
        return matches;
    };
    CompleterBaseData.prototype.extractTitle = function (item) {
        var _this = this;
        // split title fields and run extractValue for each and join with ' '
        return this._titleField.split(",")
            .map(function (field) {
            return _this.extractValue(item, field);
        })
            .join(" ");
    };
    CompleterBaseData.prototype.extractValue = function (obj, key) {
        var keys;
        var result;
        if (key) {
            keys = key.split(".");
            result = obj;
            for (var i = 0; i < keys.length; i++) {
                if (result) {
                    result = result[keys[i]];
                }
            }
        }
        else {
            result = obj;
        }
        return result;
    };
    CompleterBaseData.prototype.processResults = function (matches, term) {
        var i;
        var description;
        var image;
        var text;
        var formattedText;
        var formattedDesc;
        var results = [];
        if (matches && matches.length > 0) {
            for (i = 0; i < matches.length; i++) {
                if (this.titleField && this._titleField !== "") {
                    text = formattedText = this.extractTitle(matches[i]);
                }
                description = "";
                if (this._descriptionField) {
                    description = formattedDesc = this.extractValue(matches[i], this._descriptionField);
                }
                image = null;
                if (this._imageField) {
                    image = this.extractValue(matches[i], this._imageField);
                }
                results.push({
                    title: formattedText,
                    description: formattedDesc,
                    image: image,
                    originalObject: matches[i]
                });
            }
        }
        return results;
    };
    return CompleterBaseData;
}(Subject_1.Subject));
exports.CompleterBaseData = CompleterBaseData;


/***/ },

/***/ 87:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var Observable_1 = __webpack_require__(1);
var completer_base_data_1 = __webpack_require__(86);
var LocalData = (function (_super) {
    __extends(LocalData, _super);
    function LocalData() {
        _super.call(this);
    }
    LocalData.prototype.data = function (data) {
        var _this = this;
        if (data instanceof Observable_1.Observable) {
            data.subscribe(function (res) {
                _this._data = res;
                if (_this.savedTerm) {
                    _this.search(_this.savedTerm);
                }
            });
        }
        else {
            this._data = data;
        }
        return this;
    };
    LocalData.prototype.search = function (term) {
        if (!this._data) {
            this.savedTerm = term;
        }
        else {
            this.savedTerm = null;
            var matches = this.extractMatches(this._data, term);
            this.next(this.processResults(matches, term));
        }
    };
    LocalData = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LocalData);
    return LocalData;
}(completer_base_data_1.CompleterBaseData));
exports.LocalData = LocalData;


/***/ },

/***/ 88:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var http_1 = __webpack_require__(49);
__webpack_require__(139);
__webpack_require__(100);
var completer_base_data_1 = __webpack_require__(86);
var RemoteData = (function (_super) {
    __extends(RemoteData, _super);
    function RemoteData(http) {
        _super.call(this);
        this.http = http;
        this._urlFormater = null;
        this._dataField = null;
    }
    RemoteData.prototype.remoteUrl = function (remoteUrl) {
        this._remoteUrl = remoteUrl;
        return this;
    };
    RemoteData.prototype.urlFormater = function (urlFormater) {
        this._urlFormater = urlFormater;
    };
    RemoteData.prototype.dataField = function (dataField) {
        this._dataField = dataField;
    };
    RemoteData.prototype.headers = function (headers) {
        this._headers = headers;
    };
    RemoteData.prototype.search = function (term) {
        var _this = this;
        this.cancel();
        // let params = {};
        var url = "";
        if (this._urlFormater) {
            url = this._urlFormater(term);
        }
        else {
            url = this._remoteUrl + encodeURIComponent(term);
        }
        this.remoteSearch = this.http.get(url, { headers: this._headers || new http_1.Headers() })
            .map(function (res) { return res.json(); })
            .map(function (data) {
            var matchaes = _this.extractValue(data, _this._dataField);
            return _this.extractMatches(matchaes, term);
        })
            .map(function (matches) {
            var results = _this.processResults(matches, term);
            _this.next(results);
            return results;
        })
            .catch(function (err) {
            _this.error(err);
            return null;
        })
            .subscribe();
    };
    RemoteData.prototype.cancel = function () {
        if (this.remoteSearch) {
            this.remoteSearch.unsubscribe();
        }
    };
    return RemoteData;
}(completer_base_data_1.CompleterBaseData));
exports.RemoteData = RemoteData;


/***/ },

/***/ 89:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = __webpack_require__(0);
var ctr_completer_1 = __webpack_require__(40);
var CtrRowItem = (function () {
    function CtrRowItem(row, index) {
        this.row = row;
        this.index = index;
    }
    return CtrRowItem;
}());
exports.CtrRowItem = CtrRowItem;
var CtrDropdown = (function () {
    function CtrDropdown(completer, el) {
        this.completer = completer;
        this.el = el;
        this.rows = [];
        this.completer.registerDropdown(this);
    }
    CtrDropdown.prototype.ngOnInit = function () {
        var css = getComputedStyle(this.el.nativeElement);
        this.isScrollOn = css.maxHeight && css.overflowY === "auto";
    };
    CtrDropdown.prototype.ngOnDestroy = function () {
        this.completer.registerDropdown(null);
    };
    CtrDropdown.prototype.registerRow = function (row) {
        this.rows.push(row);
    };
    CtrDropdown.prototype.highlightRow = function (index) {
        var highlited = this.rows.find(function (row) { return row.index === index; });
        if (index < 0) {
            if (this.currHighlited) {
                this.currHighlited.row.setHighlited(false);
            }
            this.currHighlited = undefined;
            return;
        }
        if (!highlited) {
            return;
        }
        if (this.currHighlited) {
            this.currHighlited.row.setHighlited(false);
        }
        this.currHighlited = highlited;
        this.currHighlited.row.setHighlited(true);
        this.completer.onHighlighted(this.currHighlited.row.getDataItem());
    };
    CtrDropdown.prototype.clear = function () {
        this.rows = [];
    };
    CtrDropdown.prototype.onSelected = function (item) {
        this.completer.onSelected(item);
    };
    CtrDropdown.prototype.selectCurrent = function () {
        if (this.currHighlited) {
            this.onSelected(this.currHighlited.row.getDataItem());
        }
        else if (this.rows.length > 0) {
            this.onSelected(this.rows[0].row.getDataItem());
        }
    };
    CtrDropdown.prototype.nextRow = function () {
        var nextRowIndex = 0;
        if (this.currHighlited) {
            nextRowIndex = this.currHighlited.index + 1;
        }
        this.highlightRow(nextRowIndex);
        if (this.isScrollOn && this.currHighlited) {
            var row = this.currHighlited.row.getNativeElement();
            if (this.dropdownHeight() < row.getBoundingClientRect().bottom) {
                this.dropdownScrollTopTo(this.dropdownRowOffsetHeight(row));
            }
        }
    };
    CtrDropdown.prototype.prevRow = function () {
        var nextRowIndex = -1;
        if (this.currHighlited) {
            nextRowIndex = this.currHighlited.index - 1;
        }
        this.highlightRow(nextRowIndex);
        if (this.isScrollOn && this.currHighlited) {
            var rowTop = this.dropdownRowTop();
            if (rowTop < 0) {
                this.dropdownScrollTopTo(rowTop - 1);
            }
        }
    };
    CtrDropdown.prototype.dropdownScrollTopTo = function (offset) {
        this.el.nativeElement.scrollTop = this.el.nativeElement.scrollTop + offset;
    };
    CtrDropdown.prototype.dropdownRowTop = function () {
        return this.currHighlited.row.getNativeElement().getBoundingClientRect().top -
            (this.el.nativeElement.getBoundingClientRect().top +
                parseInt(getComputedStyle(this.el.nativeElement).paddingTop, 10));
    };
    CtrDropdown.prototype.dropdownHeight = function () {
        return this.el.nativeElement.getBoundingClientRect().top +
            parseInt(getComputedStyle(this.el.nativeElement).maxHeight, 10);
    };
    CtrDropdown.prototype.dropdownRowOffsetHeight = function (row) {
        var css = getComputedStyle(row);
        return row.offsetHeight +
            parseInt(css.marginTop, 10) + parseInt(css.marginBottom, 10);
    };
    CtrDropdown = __decorate([
        core_1.Directive({
            selector: "[ctrDropdown]",
        }),
        __param(0, core_1.Host()), 
        __metadata('design:paramtypes', [ctr_completer_1.CtrCompleter, core_1.ElementRef])
    ], CtrDropdown);
    return CtrDropdown;
}());
exports.CtrDropdown = CtrDropdown;


/***/ }

},[1134]);