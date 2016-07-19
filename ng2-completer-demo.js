webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(2);
	var forms_1 = __webpack_require__(84);
	var http_1 = __webpack_require__(85);
	var platform_browser_dynamic_1 = __webpack_require__(316);
	var app_cmp_1 = __webpack_require__(478);
	if (false) {
	    // Production
	    core_1.enableProdMode();
	}
	platform_browser_dynamic_1.bootstrap(app_cmp_1.AppComponent, [
	    http_1.HTTP_PROVIDERS,
	    forms_1.disableDeprecatedForms(),
	    forms_1.provideForms()
	]);


/***/ },

/***/ 61:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1 = __webpack_require__(9);
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
	                image = "";
	                if (this._imageField) {
	                    image = this.extractValue(matches[i], this._imageField);
	                }
	                // if (scope.matchClass) {
	                //   formattedText = findMatchString(text, str);
	                //   formattedDesc = findMatchString(description, str);
	                // }
	                results.push({
	                    title: formattedText,
	                    description: formattedDesc,
	                    image: image,
	                    originalObject: matches[i]
	                });
	            }
	        }
	        // if (scope.autoMatch && scope.results.length === 1 &&
	        //     checkExactMatch(scope.results[0],
	        //       {title: text, desc: description || ''}, scope.searchStr)) {
	        //   scope.showDropdown = false;
	        // } else if (scope.results.length === 0 && !displayNoResults) {
	        //   scope.showDropdown = false;
	        // } else {
	        //  this.showDropdown = true;
	        // }
	        return results;
	    };
	    return CompleterBaseData;
	}(Subject_1.Subject));
	exports.CompleterBaseData = CompleterBaseData;


/***/ },

/***/ 62:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(2);
	var completer_base_data_1 = __webpack_require__(61);
	var LocalData = (function (_super) {
	    __extends(LocalData, _super);
	    function LocalData() {
	        _super.call(this);
	    }
	    LocalData.prototype.data = function (data) {
	        this._data = data;
	        return this;
	    };
	    LocalData.prototype.search = function (term) {
	        var matches = this.extractMatches(this._data, term);
	        this.next(this.processResults(matches, term));
	    };
	    LocalData = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], LocalData);
	    return LocalData;
	}(completer_base_data_1.CompleterBaseData));
	exports.LocalData = LocalData;


/***/ },

/***/ 63:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	__webpack_require__(95);
	var completer_base_data_1 = __webpack_require__(61);
	var RemoteData = (function (_super) {
	    __extends(RemoteData, _super);
	    function RemoteData(http) {
	        _super.call(this);
	        this.http = http;
	        this._urlFormater = null;
	    }
	    RemoteData.prototype.remoteUrl = function (remoteUrl) {
	        this._remoteUrl = remoteUrl;
	        return this;
	    };
	    RemoteData.prototype.urlFormater = function (urlFormater) {
	        this._urlFormater = urlFormater;
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
	        this.remoteSearch = this.http.get(url)
	            .map(function (res) { return res.json(); })
	            .map(function (data) {
	            return _this.extractMatches(data, term);
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

/***/ 93:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(2);
	var local_data_1 = __webpack_require__(62);
	var remote_data_1 = __webpack_require__(63);
	var CompleterService = (function () {
	    function CompleterService(localDataFactory, remoteDataFactory) {
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
	        __param(1, core_1.Inject(remote_data_1.RemoteData)), 
	        __metadata('design:paramtypes', [Function, Function])
	    ], CompleterService);
	    return CompleterService;
	}());
	exports.CompleterService = CompleterService;


/***/ },

/***/ 217:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(2);
	var forms_1 = __webpack_require__(84);
	var Observable_1 = __webpack_require__(1);
	var completer_list_cmp_1 = __webpack_require__(218);
	__webpack_require__(228);
	var template = __webpack_require__(224);
	var defaultStyles = __webpack_require__(223);
	// keyboard events
	var KEY_DW = 40;
	var KEY_RT = 39;
	var KEY_UP = 38;
	var KEY_LF = 37;
	var KEY_ES = 27;
	var KEY_EN = 13;
	var KEY_TAB = 9;
	var MIN_SEARCH_LENGTH = 3;
	var MAX_CHARS = 524288; // the default max length per the html maxlength attribute
	var PAUSE = 250;
	var BLUR_TIMEOUT = 200;
	var TEXT_SEARCHING = "Searching...";
	var TEXT_NORESULTS = "No results found";
	var noop = function () { };
	var COMPLETER_CONTROL_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, {
	    useExisting: core_1.forwardRef(function () { return CompleterCmp; }),
	    multi: true
	});
	var CompleterCmp = (function () {
	    function CompleterCmp() {
	        this.searchFields = "";
	        this.inputName = "";
	        this.pause = PAUSE;
	        this.minSearchLength = MIN_SEARCH_LENGTH;
	        this.maxChars = MAX_CHARS;
	        this.overrideSuggested = false;
	        this.clearSelected = false;
	        this.placeholder = "";
	        this.textSearching = TEXT_SEARCHING;
	        this.textNoResults = TEXT_NORESULTS;
	        this.autoMatch = false;
	        this.disableInput = false;
	        this.selected = new core_1.EventEmitter();
	        this.searchStr = "";
	        this.searching = false;
	        this.showDropdown = false;
	        this.displayNoResults = true;
	        this.searchTimer = null;
	        this.hideTimer = null;
	        this.displaySearching = true;
	        this.selectedObject = null;
	        this.results = [];
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
	    CompleterCmp.prototype.keyupHandler = function (event) {
	        var _this = this;
	        if (event.keyCode === KEY_LF || event.keyCode === KEY_RT) {
	            // do nothing
	            return;
	        }
	        if (event.keyCode === KEY_UP || event.keyCode === KEY_EN) {
	            event.preventDefault();
	        }
	        else if (event.keyCode === KEY_DW) {
	            event.preventDefault();
	            if (!this.showDropdown && this.searchStr && this.searchStr.length >= this.minSearchLength) {
	                this.initResults();
	                this.searching = true;
	                this.searchTimerComplete(this.searchStr);
	            }
	        }
	        else if (event.keyCode === KEY_ES) {
	            this.clearResults();
	        }
	        else {
	            this._onChangeCallback(this.searchStr);
	            if (!this.searchStr) {
	                this.showDropdown = false;
	                return;
	            }
	            if (this.searchStr === "") {
	                this.showDropdown = false;
	            }
	            else if (this.searchStr.length >= this.minSearchLength) {
	                this.initResults();
	                if (this.searchTimer) {
	                    clearTimeout(this.searchTimer);
	                }
	                this.searching = true;
	                this.searchTimer = setTimeout(function () {
	                    _this.searchTimerComplete(_this.searchStr);
	                }, this.pause);
	            }
	        }
	    };
	    CompleterCmp.prototype.keydownHandler = function (event) {
	        if (event.keyCode === KEY_EN && this.results) {
	            if (this.listCmp.currentIndex >= 0 && this.listCmp.currentIndex < this.results.length) {
	                event.preventDefault();
	                this.selectResult(this.results[this.listCmp.currentIndex]);
	            }
	            else {
	                this.handleOverrideSuggestions(event);
	                this.clearResults();
	            }
	        }
	        else if (event.keyCode === KEY_DW && this.results) {
	            event.preventDefault();
	            if (this.showDropdown && (this.listCmp.currentIndex + 1) < this.results.length) {
	                this.listCmp.incIndex();
	                this.searchStr = this.results[this.listCmp.currentIndex].title;
	            }
	        }
	        else if (event.keyCode === KEY_UP && this.results) {
	            event.preventDefault();
	            if (this.showDropdown && this.listCmp.currentIndex >= 1) {
	                this.listCmp.decIndex();
	                this.searchStr = this.results[this.listCmp.currentIndex].title;
	            }
	            else if (this.showDropdown && this.listCmp.currentIndex === 0) {
	                this.listCmp.unselect();
	            }
	        }
	        else if (event.keyCode === KEY_TAB) {
	            if (this.results && this.results.length > 0 && this.showDropdown) {
	                if (this.listCmp.currentIndex === -1 && this.overrideSuggested) {
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
	        }
	        else if (event.keyCode === KEY_ES) {
	            // This is very specific to IE10/11 #272
	            // without this, IE clears the input text
	            event.preventDefault();
	        }
	    };
	    CompleterCmp.prototype.ngOnInit = function () {
	        var _this = this;
	        if (this.textNoResults === "false") {
	            this.displayNoResults = false;
	        }
	        if (this.textSearching === "false") {
	            this.displaySearching = false;
	        }
	        this.selected.subscribe(function () {
	            _this.clearResults();
	        });
	        this.dataService
	            .catch(function (err) { return _this.handleError(err); })
	            .subscribe(function (results) {
	            _this.searching = false;
	            _this.results = results;
	            if (_this.autoMatch && _this.results.length === 1 &&
	                _this.results[0].title.toLocaleLowerCase() === _this.searchStr.toLocaleLowerCase()) {
	                _this.showDropdown = false;
	            }
	            else if (_this.results.length === 0 && !_this.displayNoResults) {
	                _this.showDropdown = false;
	            }
	            else {
	                _this.showDropdown = true;
	            }
	        });
	    };
	    CompleterCmp.prototype.selectResult = function (result) {
	        this.searchStr = result.title;
	        this._onChangeCallback(this.searchStr);
	        this.callOrAssign(result);
	        if (this.clearSelected) {
	            this.searchStr = null;
	        }
	        this.clearResults();
	    };
	    ;
	    CompleterCmp.prototype.hideResults = function () {
	        var _this = this;
	        this.hideTimer = setTimeout(function () {
	            _this.clearResults();
	        }, BLUR_TIMEOUT);
	        if (this.overrideSuggested) {
	            if (this.searchStr && this.searchStr.length > 0 && this.listCmp && this.listCmp.currentIndex === -1) {
	                this.handleOverrideSuggestions();
	            }
	        }
	        else {
	            if (this.listCmp && this.listCmp.currentIndex >= 0) {
	                this.selectResult(this.results[this.listCmp.currentIndex]);
	            }
	        }
	        this.dataService.cancel();
	    };
	    ;
	    CompleterCmp.prototype.onBlur = function () {
	        this.onTouched();
	        this.hideResults();
	    };
	    CompleterCmp.prototype.initResults = function () {
	        this.showDropdown = this.displaySearching;
	        this.results = [];
	    };
	    CompleterCmp.prototype.searchTimerComplete = function (str) {
	        // Begin the search
	        if (!str || str.length < this.minSearchLength) {
	            return;
	        }
	        this.dataService.search(str);
	    };
	    CompleterCmp.prototype.clearResults = function () {
	        this.results = [];
	        this.showDropdown = false;
	    };
	    CompleterCmp.prototype.handleOverrideSuggestions = function (event) {
	        if (this.overrideSuggested &&
	            !(this.selectedObject && this.selectedObject.originalObject === this.searchStr)) {
	            if (event) {
	                event.preventDefault();
	            }
	            // cancel search timer
	            clearTimeout(this.searchTimer);
	            // cancel http request
	            this.dataService.cancel();
	            this.setInputString(this.searchStr);
	        }
	    };
	    CompleterCmp.prototype.setInputString = function (str) {
	        this.callOrAssign({
	            title: null,
	            originalObject: str
	        });
	        if (this.clearSelected) {
	            this.searchStr = null;
	        }
	        this.clearResults();
	    };
	    CompleterCmp.prototype.callOrAssign = function (value) {
	        this.selectedObject = value;
	        this.selected.emit(value);
	    };
	    CompleterCmp.prototype.handleError = function (error) {
	        this.searching = false;
	        var errMsg = (error.message) ? error.message :
	            error.status ? error.status + " - " + error.statusText : "Server error";
	        if (console && console.error) {
	            console.error(errMsg); // log to console 
	        }
	        return Observable_1.Observable.throw(errMsg);
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], CompleterCmp.prototype, "dataService", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], CompleterCmp.prototype, "searchFields", void 0);
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
	        core_1.ViewChild(completer_list_cmp_1.CompleterListCmp), 
	        __metadata('design:type', completer_list_cmp_1.CompleterListCmp)
	    ], CompleterCmp.prototype, "listCmp", void 0);
	    CompleterCmp = __decorate([
	        core_1.Component({
	            selector: "ng2-completer",
	            directives: [completer_list_cmp_1.CompleterListCmp],
	            template: template,
	            styles: [defaultStyles],
	            providers: [COMPLETER_CONTROL_VALUE_ACCESSOR]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], CompleterCmp);
	    return CompleterCmp;
	}());
	exports.CompleterCmp = CompleterCmp;


/***/ },

/***/ 218:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(2);
	var completer_list_item_cmp_1 = __webpack_require__(219);
	var template = __webpack_require__(226);
	var defaultStyles = __webpack_require__(225);
	var CompleterListCmp = (function () {
	    function CompleterListCmp(listElm) {
	        this.listElm = listElm;
	        this.results = [];
	        this.searchStr = "";
	        this.selected = new core_1.EventEmitter();
	        this.currentIndex = -1;
	        this.isScrollOn = false;
	    }
	    CompleterListCmp.prototype.ngAfterContentInit = function () {
	        this.dd = this.listElm.nativeElement.querySelector(".completer-dropdown");
	        var css = getComputedStyle(this.dd);
	        this.isScrollOn = css.maxHeight && css.overflowY === "auto";
	    };
	    CompleterListCmp.prototype.onClick = function (result) {
	        this.selected.emit(result);
	    };
	    CompleterListCmp.prototype.hoverRow = function (index) {
	        this.currentIndex = index;
	    };
	    ;
	    CompleterListCmp.prototype.incIndex = function () {
	        this.currentIndex++;
	        if (this.isScrollOn) {
	            var row = this.dropdownRow();
	            if (this.dropdownHeight() < row.getBoundingClientRect().bottom) {
	                this.dropdownScrollTopTo(this.dropdownRowOffsetHeight(row));
	            }
	        }
	    };
	    CompleterListCmp.prototype.decIndex = function () {
	        this.currentIndex--;
	        if (this.isScrollOn) {
	            var rowTop = this.dropdownRowTop();
	            if (rowTop < 0) {
	                this.dropdownScrollTopTo(rowTop - 1);
	            }
	        }
	    };
	    CompleterListCmp.prototype.unselect = function () {
	        this.currentIndex = -1;
	    };
	    CompleterListCmp.prototype.toTop = function () {
	        this.currentIndex = 0;
	    };
	    CompleterListCmp.prototype.dropdownRow = function () {
	        return this.listElm.nativeElement.querySelectorAll(".completer-row")[this.currentIndex];
	    };
	    CompleterListCmp.prototype.dropdownHeight = function () {
	        return this.dd.getBoundingClientRect().top +
	            parseInt(getComputedStyle(this.dd).maxHeight, 10);
	    };
	    CompleterListCmp.prototype.dropdownScrollTopTo = function (offset) {
	        this.dd.scrollTop = this.dd.scrollTop + offset;
	    };
	    CompleterListCmp.prototype.dropdownRowOffsetHeight = function (row) {
	        var css = getComputedStyle(row);
	        return row.offsetHeight +
	            parseInt(css.marginTop, 10) + parseInt(css.marginBottom, 10);
	    };
	    CompleterListCmp.prototype.dropdownRowTop = function () {
	        return this.dropdownRow().getBoundingClientRect().top -
	            (this.dd.getBoundingClientRect().top +
	                parseInt(getComputedStyle(this.dd).paddingTop, 10));
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Array)
	    ], CompleterListCmp.prototype, "results", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], CompleterListCmp.prototype, "matchClass", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], CompleterListCmp.prototype, "searchStr", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], CompleterListCmp.prototype, "textSearching", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], CompleterListCmp.prototype, "searching", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], CompleterListCmp.prototype, "textNoResults", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], CompleterListCmp.prototype, "displaySearching", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], CompleterListCmp.prototype, "selected", void 0);
	    CompleterListCmp = __decorate([
	        core_1.Component({
	            selector: "completer-list",
	            template: template,
	            styles: [defaultStyles],
	            directives: [completer_list_item_cmp_1.CompleterListItemCmp]
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef])
	    ], CompleterListCmp);
	    return CompleterListCmp;
	}());
	exports.CompleterListCmp = CompleterListCmp;


/***/ },

/***/ 219:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(2);
	var template = __webpack_require__(227);
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
	            template: template
	        }), 
	        __metadata('design:paramtypes', [])
	    ], CompleterListItemCmp);
	    return CompleterListItemCmp;
	}());
	exports.CompleterListItemCmp = CompleterListItemCmp;


/***/ },

/***/ 220:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(2);
	var http_1 = __webpack_require__(85);
	var local_data_1 = __webpack_require__(62);
	var remote_data_1 = __webpack_require__(63);
	var completer_service_1 = __webpack_require__(93);
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
	exports.AUTOCOMPLET_DATA_PROVIDES = [
	    core_1.provide(local_data_1.LocalData, { useFactory: localDataFactory }),
	    core_1.provide(remote_data_1.RemoteData, { useFactory: remoteDataFactory, deps: [http_1.Http] }),
	    core_1.provide(completer_service_1.CompleterService, { useClass: completer_service_1.CompleterService })
	];


/***/ },

/***/ 221:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var completer_cmp_1 = __webpack_require__(217);
	exports.CompleterCmp = completer_cmp_1.CompleterCmp;
	var completer_data_factory_1 = __webpack_require__(220);
	exports.AUTOCOMPLET_DATA_PROVIDES = completer_data_factory_1.AUTOCOMPLET_DATA_PROVIDES;
	var completer_service_1 = __webpack_require__(93);
	exports.CompleterService = completer_service_1.CompleterService;
	var local_data_1 = __webpack_require__(62);
	exports.LocalData = local_data_1.LocalData;
	var remote_data_1 = __webpack_require__(63);
	exports.RemoteData = remote_data_1.RemoteData;
	var completer_base_data_1 = __webpack_require__(61);
	exports.CompleterBaseData = completer_base_data_1.CompleterBaseData;


/***/ },

/***/ 223:
/***/ function(module, exports) {

	module.exports = ""

/***/ },

/***/ 224:
/***/ function(module, exports) {

	module.exports = "<div class=\"completer-holder\">\n    <input class=\"completer-input\"\n        [(ngModel)]=\"searchStr\"\n        (keyup)=\"keyupHandler($event)\"\n        (keydown)=\"keydownHandler($event)\"\n        [attr.name]=\"inputName\"\n        [placeholder]=\"placeholder\"\n        [attr.maxlength]=\"maxChars\"\n        (blur)=\"onBlur()\"\n        [tabindex]=\"fieldTabindex\"\n        [disabled]=\"disableInput\"\n        completer=\"off\"\n        autocorrect=\"off\"\n        autocapitalize=\"off\"\n    />\n    <completer-list *ngIf=\"showDropdown\" class=\"completer-dropdown-holder\" [results]=\"results\"  [searchStr]=\"searchStr\" (selected)=\"selectResult($event)\" \n       [matchClass]=\"matchClass\" [textSearching]=\"textSearching\" [searching]=\"searching\" [textNoResults]=\"textNoResults\" [displaySearching]=\"displaySearching\">\n    </completer-list>\n\n</div>"

/***/ },

/***/ 225:
/***/ function(module, exports) {

	module.exports = ".completer-dropdown {\n    border-color: #ececec;\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 2px;\n    width: 250px;\n    padding: 6px;\n    cursor: pointer;\n    z-index: 9999;\n    position: absolute;\n    /*top: 32px;\n    left: 0px;\n    */\n    margin-top: -6px;\n    background-color: #ffffff;\n}\n\n.completer-row {\n    padding: 5px;\n    color: #000000;\n    margin-bottom: 4px;\n    clear: both;\n}\n\n.completer-selected-row {\n    background-color: lightblue;\n    color: #ffffff;\n}\n\n.completer-description {\n    font-size: 14px;\n}"

/***/ },

/***/ 226:
/***/ function(module, exports) {

	module.exports = "<div class=\"completer-dropdown\">\n    <div *ngIf=\"searching && displaySearching\" class=\"completer-searching\">{{textSearching}}</div>\n    <div *ngIf=\"!searching && (!results || results.length == 0)\" class=\"completer-no-results\">{{textNoResults}}</div>\n    <div class=\"completer-row\" *ngFor=\"let result of results; let i=index\" (mouseenter)=\"hoverRow(i)\" (click)=\"onClick(result)\" [ngClass]=\"{'completer-selected-row': i == currentIndex}\">\n        <div *ngIf=\"result.image && result.image != ''\" class=\"completer-image-holder\">\n            <img *ngIf=\"result.image && result.image != ''\" src=\"{{result.image}}\" class=\"completer-image\" />\n            <div *ngIf=\"!result.image && result.image != ''\" class=\"completer-image-default\"></div>\n        </div>\n        <completer-list-item class=\"completer-title\" [text]=\"result.title\" [matchClass]=\"matchClass\" [searchStr]=\"searchStr\" [type]=\"'title'\"></completer-list-item>\n        <completer-list-item *ngIf=\"result.description && result.description != ''\" class=\"completer-description\"\n            [text]=\"result.description\" [matchClass]=\"matchClass\" [searchStr]=\"searchStr\" [type]=\"'description'\">\n        </completer-list-item>\n\n        <!--<div ng-if=\"matchClass && result.description && result.description != \\'\\'\" class=\"angucomplete-description\" ng-bind-html=\"result.description\"></div>-->\n        <!--<div *ngIf=\"!matchClass && result.description && result.description != ''\" class=\"completer-description\">{{result.description}}</div>-->\n    </div>\n</div>"

/***/ },

/***/ 227:
/***/ function(module, exports) {

	module.exports = "<div class=\"completer-list-item-holder\" [ngClass]=\"{'completer-title': type === 'title', 'completer-description': type === 'description'}\" >\n    <span class=\"completer-list-item\" *ngFor=\"let part of parts\" [ngClass]=\"part.isMatch ? matchClass : null\">{{part.text}}</span>\n</div>"

/***/ },

/***/ 478:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(2);
	var router_1 = __webpack_require__(330);
	var http_1 = __webpack_require__(85);
	var forms_1 = __webpack_require__(84);
	var ng2_completer_1 = __webpack_require__(221);
	__webpack_require__(333);
	var template = __webpack_require__(482);
	var style = __webpack_require__(481);
	var AppComponent = (function () {
	    function AppComponent(fb, completerService) {
	        this.fb = fb;
	        this.completerService = completerService;
	        this.countries = __webpack_require__(480);
	        this.quotes = [
	            {
	                qt: "Always forgive your enemies; nothing annoys them so much.",
	                nm: "Friedrich Nietzsche"
	            },
	            {
	                qt: "Analyzing humor is like dissecting a frog. Few people are interested and the frog dies of it.",
	                nm: "E.B. White"
	            },
	            {
	                qt: "Humor is perhaps a sense of intellectual perspective: an awareness that some things are really important, others not; and that the two kinds are most oddly jumbled in everyday affairs.",
	                nm: "Voltaire"
	            },
	            {
	                qt: "I think the next best thing to solving a problem is finding some humor in it.",
	                nm: "Frank Howard Clark"
	            },
	            {
	                qt: "Life is tough, and if you have the ability to laugh at it you have the ability to enjoy it.",
	                nm: "Salma Hayek"
	            },
	            {
	                qt: "Never be afraid to laugh at yourself. After all, you could be missing out on the joke of the century.",
	                nm: "Benjamin Franklin"
	            },
	            {
	                qt: "That is the saving grace of humor. If you fail no one is laughing at you.",
	                nm: "William Arthur Ward"
	            },
	            {
	                qt: "The best jokes are dangerous, and dangerous because they are in some way truthful.",
	                nm: "Kurt Vonnegut"
	            },
	            {
	                qt: "There’s so much comedy on television. Does that cause comedy in the streets?",
	                nm: "Henry Ford"
	            },
	            {
	                qt: "You are not angry with people when you laugh at them. Humor teaches tolerance.",
	                nm: "W. Somerset Maugham"
	            }
	        ];
	        this.countryName2 = "";
	        this.quote = "";
	        this.searchcb = false;
	        this.dataService = completerService.local(this.countries, "name", "name").imageField("flag");
	        this.dataService2 = completerService.local(this.quotes, "nm", "nm").descriptionField("qt");
	        this.dataRemote = completerService.remote("https://raw.githubusercontent.com/oferh/ng2-completer/ver-0.2.0/demo/res/data/countries.json?", "name", "name");
	        this.dataService3 = completerService.local(this.countries, "name", "name");
	        this.dataService4 = completerService.local(this.countries, "name", "name");
	    }
	    AppComponent.prototype.onCountrySelected = function (selected) {
	        this.countryName2 = selected.title;
	    };
	    AppComponent.prototype.onQuoteSelected = function (selected) {
	        this.quote = selected.description;
	    };
	    AppComponent = __decorate([
	        core_1.Component({
	            selector: "demo-app",
	            directives: [ng2_completer_1.CompleterCmp, router_1.ROUTER_DIRECTIVES, forms_1.FORM_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES],
	            template: template,
	            styles: [style],
	            providers: [ng2_completer_1.CompleterService, ng2_completer_1.AUTOCOMPLET_DATA_PROVIDES, http_1.HTTP_PROVIDERS]
	        }), 
	        __metadata('design:paramtypes', [forms_1.FormBuilder, ng2_completer_1.CompleterService])
	    ], AppComponent);
	    return AppComponent;
	}());
	exports.AppComponent = AppComponent;


/***/ },

/***/ 480:
/***/ function(module, exports) {

	module.exports = [
		{
			"name": "Afghanistan",
			"code": "AF",
			"flag": "/demo/res/img/af.png"
		},
		{
			"name": "Aland Islands",
			"code": "AX",
			"flag": "/demo/res/img/ax.png"
		},
		{
			"name": "Albania",
			"code": "AL",
			"flag": "/demo/res/img/al.png"
		},
		{
			"name": "Algeria",
			"code": "DZ",
			"flag": "/demo/res/img/dz.png"
		},
		{
			"name": "American Samoa",
			"code": "AS",
			"flag": "/demo/res/img/as.png"
		},
		{
			"name": "AndorrA",
			"code": "AD",
			"flag": "/demo/res/img/ad.png"
		},
		{
			"name": "Angola",
			"code": "AO",
			"flag": "/demo/res/img/ao.png"
		},
		{
			"name": "Anguilla",
			"code": "AI",
			"flag": "/demo/res/img/ai.png"
		},
		{
			"name": "Antarctica",
			"code": "AQ",
			"flag": "/demo/res/img/aq.png"
		},
		{
			"name": "Antigua and Barbuda",
			"code": "AG",
			"flag": "/demo/res/img/ag.png"
		},
		{
			"name": "Argentina",
			"code": "AR",
			"flag": "/demo/res/img/ar.png"
		},
		{
			"name": "Armenia",
			"code": "AM",
			"flag": "/demo/res/img/am.png"
		},
		{
			"name": "Aruba",
			"code": "AW",
			"flag": "/demo/res/img/aw.png"
		},
		{
			"name": "Australia",
			"code": "AU",
			"flag": "/demo/res/img/au.png"
		},
		{
			"name": "Austria",
			"code": "AT",
			"flag": "/demo/res/img/at.png"
		},
		{
			"name": "Azerbaijan",
			"code": "AZ",
			"flag": "/demo/res/img/az.png"
		},
		{
			"name": "Bahamas",
			"code": "BS",
			"flag": "/demo/res/img/bs.png"
		},
		{
			"name": "Bahrain",
			"code": "BH",
			"flag": "/demo/res/img/bh.png"
		},
		{
			"name": "Bangladesh",
			"code": "BD",
			"flag": "/demo/res/img/bd.png"
		},
		{
			"name": "Barbados",
			"code": "BB",
			"flag": "/demo/res/img/bb.png"
		},
		{
			"name": "Belarus",
			"code": "BY",
			"flag": "/demo/res/img/by.png"
		},
		{
			"name": "Belgium",
			"code": "BE",
			"flag": "/demo/res/img/be.png"
		},
		{
			"name": "Belize",
			"code": "BZ",
			"flag": "/demo/res/img/bz.png"
		},
		{
			"name": "Benin",
			"code": "BJ",
			"flag": "/demo/res/img/bj.png"
		},
		{
			"name": "Bermuda",
			"code": "BM",
			"flag": "/demo/res/img/bm.png"
		},
		{
			"name": "Bhutan",
			"code": "BT",
			"flag": "/demo/res/img/bt.png"
		},
		{
			"name": "Bolivia",
			"code": "BO",
			"flag": "/demo/res/img/bo.png"
		},
		{
			"name": "Bosnia and Herzegovina",
			"code": "BA",
			"flag": "/demo/res/img/ba.png"
		},
		{
			"name": "Botswana",
			"code": "BW",
			"flag": "/demo/res/img/bw.png"
		},
		{
			"name": "Bouvet Island",
			"code": "BV",
			"flag": "/demo/res/img/bv.png"
		},
		{
			"name": "Brazil",
			"code": "BR",
			"flag": "/demo/res/img/br.png"
		},
		{
			"name": "British Indian Ocean Territory",
			"code": "IO",
			"flag": "/demo/res/img/io.png"
		},
		{
			"name": "Brunei Darussalam",
			"code": "BN",
			"flag": "/demo/res/img/bn.png"
		},
		{
			"name": "Bulgaria",
			"code": "BG",
			"flag": "/demo/res/img/bg.png"
		},
		{
			"name": "Burkina Faso",
			"code": "BF",
			"flag": "/demo/res/img/bf.png"
		},
		{
			"name": "Burundi",
			"code": "BI",
			"flag": "/demo/res/img/bi.png"
		},
		{
			"name": "Cambodia",
			"code": "KH",
			"flag": "/demo/res/img/kh.png"
		},
		{
			"name": "Cameroon",
			"code": "CM",
			"flag": "/demo/res/img/cm.png"
		},
		{
			"name": "Canada",
			"code": "CA",
			"flag": "/demo/res/img/ca.png"
		},
		{
			"name": "Cape Verde",
			"code": "CV",
			"flag": "/demo/res/img/cv.png"
		},
		{
			"name": "Cayman Islands",
			"code": "KY",
			"flag": "/demo/res/img/ky.png"
		},
		{
			"name": "Central African Republic",
			"code": "CF",
			"flag": "/demo/res/img/cf.png"
		},
		{
			"name": "Chad",
			"code": "TD",
			"flag": "/demo/res/img/td.png"
		},
		{
			"name": "Chile",
			"code": "CL",
			"flag": "/demo/res/img/cl.png"
		},
		{
			"name": "China",
			"code": "CN",
			"flag": "/demo/res/img/cn.png"
		},
		{
			"name": "Christmas Island",
			"code": "CX",
			"flag": "/demo/res/img/cx.png"
		},
		{
			"name": "Cocos (Keeling) Islands",
			"code": "CC",
			"flag": "/demo/res/img/cc.png"
		},
		{
			"name": "Colombia",
			"code": "CO",
			"flag": "/demo/res/img/co.png"
		},
		{
			"name": "Comoros",
			"code": "KM",
			"flag": "/demo/res/img/km.png"
		},
		{
			"name": "Congo",
			"code": "CG",
			"flag": "/demo/res/img/cg.png"
		},
		{
			"name": "Congo, The Democratic Republic of the",
			"code": "CD",
			"flag": "/demo/res/img/cd.png"
		},
		{
			"name": "Cook Islands",
			"code": "CK",
			"flag": "/demo/res/img/ck.png"
		},
		{
			"name": "Costa Rica",
			"code": "CR",
			"flag": "/demo/res/img/cr.png"
		},
		{
			"name": "Cote D\"Ivoire",
			"code": "CI",
			"flag": "/demo/res/img/ci.png"
		},
		{
			"name": "Croatia",
			"code": "HR",
			"flag": "/demo/res/img/hr.png"
		},
		{
			"name": "Cuba",
			"code": "CU",
			"flag": "/demo/res/img/cu.png"
		},
		{
			"name": "Cyprus",
			"code": "CY",
			"flag": "/demo/res/img/cy.png"
		},
		{
			"name": "Czech Republic",
			"code": "CZ",
			"flag": "/demo/res/img/cz.png"
		},
		{
			"name": "Denmark",
			"code": "DK",
			"flag": "/demo/res/img/dk.png"
		},
		{
			"name": "Djibouti",
			"code": "DJ",
			"flag": "/demo/res/img/dj.png"
		},
		{
			"name": "Dominica",
			"code": "DM",
			"flag": "/demo/res/img/dm.png"
		},
		{
			"name": "Dominican Republic",
			"code": "DO",
			"flag": "/demo/res/img/do.png"
		},
		{
			"name": "Ecuador",
			"code": "EC",
			"flag": "/demo/res/img/ec.png"
		},
		{
			"name": "Egypt",
			"code": "EG",
			"flag": "/demo/res/img/eg.png"
		},
		{
			"name": "El Salvador",
			"code": "SV",
			"flag": "/demo/res/img/sv.png"
		},
		{
			"name": "Equatorial Guinea",
			"code": "GQ",
			"flag": "/demo/res/img/gq.png"
		},
		{
			"name": "Eritrea",
			"code": "ER",
			"flag": "/demo/res/img/er.png"
		},
		{
			"name": "Estonia",
			"code": "EE",
			"flag": "/demo/res/img/ee.png"
		},
		{
			"name": "Ethiopia",
			"code": "ET",
			"flag": "/demo/res/img/et.png"
		},
		{
			"name": "Falkland Islands (Malvinas)",
			"code": "FK",
			"flag": "/demo/res/img/fk.png"
		},
		{
			"name": "Faroe Islands",
			"code": "FO",
			"flag": "/demo/res/img/fo.png"
		},
		{
			"name": "Fiji",
			"code": "FJ",
			"flag": "/demo/res/img/fj.png"
		},
		{
			"name": "Finland",
			"code": "FI",
			"flag": "/demo/res/img/fi.png"
		},
		{
			"name": "France",
			"code": "FR",
			"flag": "/demo/res/img/fr.png"
		},
		{
			"name": "French Guiana",
			"code": "GF",
			"flag": "/demo/res/img/gf.png"
		},
		{
			"name": "French Polynesia",
			"code": "PF",
			"flag": "/demo/res/img/pf.png"
		},
		{
			"name": "French Southern Territories",
			"code": "TF",
			"flag": "/demo/res/img/tf.png"
		},
		{
			"name": "Gabon",
			"code": "GA",
			"flag": "/demo/res/img/ga.png"
		},
		{
			"name": "Gambia",
			"code": "GM",
			"flag": "/demo/res/img/gm.png"
		},
		{
			"name": "Georgia",
			"code": "GE",
			"flag": "/demo/res/img/ge.png"
		},
		{
			"name": "Germany",
			"code": "DE",
			"flag": "/demo/res/img/de.png"
		},
		{
			"name": "Ghana",
			"code": "GH",
			"flag": "/demo/res/img/gh.png"
		},
		{
			"name": "Gibraltar",
			"code": "GI",
			"flag": "/demo/res/img/gi.png"
		},
		{
			"name": "Greece",
			"code": "GR",
			"flag": "/demo/res/img/gr.png"
		},
		{
			"name": "Greenland",
			"code": "GL",
			"flag": "/demo/res/img/gl.png"
		},
		{
			"name": "Grenada",
			"code": "GD",
			"flag": "/demo/res/img/gd.png"
		},
		{
			"name": "Guadeloupe",
			"code": "GP",
			"flag": "/demo/res/img/gp.png"
		},
		{
			"name": "Guam",
			"code": "GU",
			"flag": "/demo/res/img/gu.png"
		},
		{
			"name": "Guatemala",
			"code": "GT",
			"flag": "/demo/res/img/gt.png"
		},
		{
			"name": "Guernsey",
			"code": "GG",
			"flag": "/demo/res/img/gg.png"
		},
		{
			"name": "Guinea",
			"code": "GN",
			"flag": "/demo/res/img/gn.png"
		},
		{
			"name": "Guinea-Bissau",
			"code": "GW",
			"flag": "/demo/res/img/gw.png"
		},
		{
			"name": "Guyana",
			"code": "GY",
			"flag": "/demo/res/img/gy.png"
		},
		{
			"name": "Haiti",
			"code": "HT",
			"flag": "/demo/res/img/ht.png"
		},
		{
			"name": "Heard Island and Mcdonald Islands",
			"code": "HM",
			"flag": "/demo/res/img/hm.png"
		},
		{
			"name": "Holy See (Vatican City State)",
			"code": "VA",
			"flag": "/demo/res/img/va.png"
		},
		{
			"name": "Honduras",
			"code": "HN",
			"flag": "/demo/res/img/hn.png"
		},
		{
			"name": "Hong Kong",
			"code": "HK",
			"flag": "/demo/res/img/hk.png"
		},
		{
			"name": "Hungary",
			"code": "HU",
			"flag": "/demo/res/img/hu.png"
		},
		{
			"name": "Iceland",
			"code": "IS",
			"flag": "/demo/res/img/is.png"
		},
		{
			"name": "India",
			"code": "IN",
			"flag": "/demo/res/img/in.png"
		},
		{
			"name": "Indonesia",
			"code": "ID",
			"flag": "/demo/res/img/id.png"
		},
		{
			"name": "Iran, Islamic Republic Of",
			"code": "IR",
			"flag": "/demo/res/img/ir.png"
		},
		{
			"name": "Iraq",
			"code": "IQ",
			"flag": "/demo/res/img/iq.png"
		},
		{
			"name": "Ireland",
			"code": "IE",
			"flag": "/demo/res/img/ie.png"
		},
		{
			"name": "Isle of Man",
			"code": "IM",
			"flag": "/demo/res/img/im.png"
		},
		{
			"name": "Israel",
			"code": "IL",
			"flag": "/demo/res/img/il.png"
		},
		{
			"name": "Italy",
			"code": "IT",
			"flag": "/demo/res/img/it.png"
		},
		{
			"name": "Jamaica",
			"code": "JM",
			"flag": "/demo/res/img/jm.png"
		},
		{
			"name": "Japan",
			"code": "JP",
			"flag": "/demo/res/img/jp.png"
		},
		{
			"name": "Jersey",
			"code": "JE",
			"flag": "/demo/res/img/je.png"
		},
		{
			"name": "Jordan",
			"code": "JO",
			"flag": "/demo/res/img/jo.png"
		},
		{
			"name": "Kazakhstan",
			"code": "KZ",
			"flag": "/demo/res/img/kz.png"
		},
		{
			"name": "Kenya",
			"code": "KE",
			"flag": "/demo/res/img/ke.png"
		},
		{
			"name": "Kiribati",
			"code": "KI",
			"flag": "/demo/res/img/ki.png"
		},
		{
			"name": "Korea, Democratic People\"S Republic of",
			"code": "KP",
			"flag": "/demo/res/img/kp.png"
		},
		{
			"name": "Korea, Republic of",
			"code": "KR",
			"flag": "/demo/res/img/kr.png"
		},
		{
			"name": "Kuwait",
			"code": "KW",
			"flag": "/demo/res/img/kw.png"
		},
		{
			"name": "Kyrgyzstan",
			"code": "KG",
			"flag": "/demo/res/img/kg.png"
		},
		{
			"name": "Lao People\"S Democratic Republic",
			"code": "LA",
			"flag": "/demo/res/img/la.png"
		},
		{
			"name": "Latvia",
			"code": "LV",
			"flag": "/demo/res/img/lv.png"
		},
		{
			"name": "Lebanon",
			"code": "LB",
			"flag": "/demo/res/img/lb.png"
		},
		{
			"name": "Lesotho",
			"code": "LS",
			"flag": "/demo/res/img/ls.png"
		},
		{
			"name": "Liberia",
			"code": "LR",
			"flag": "/demo/res/img/lr.png"
		},
		{
			"name": "Libyan Arab Jamahiriya",
			"code": "LY",
			"flag": "/demo/res/img/ly.png"
		},
		{
			"name": "Liechtenstein",
			"code": "LI",
			"flag": "/demo/res/img/li.png"
		},
		{
			"name": "Lithuania",
			"code": "LT",
			"flag": "/demo/res/img/lt.png"
		},
		{
			"name": "Luxembourg",
			"code": "LU",
			"flag": "/demo/res/img/lu.png"
		},
		{
			"name": "Macao",
			"code": "MO",
			"flag": "/demo/res/img/mo.png"
		},
		{
			"name": "Macedonia, The Former Yugoslav Republic of",
			"code": "MK",
			"flag": "/demo/res/img/mk.png"
		},
		{
			"name": "Madagascar",
			"code": "MG",
			"flag": "/demo/res/img/mg.png"
		},
		{
			"name": "Malawi",
			"code": "MW",
			"flag": "/demo/res/img/mw.png"
		},
		{
			"name": "Malaysia",
			"code": "MY",
			"flag": "/demo/res/img/my.png"
		},
		{
			"name": "Maldives",
			"code": "MV",
			"flag": "/demo/res/img/mv.png"
		},
		{
			"name": "Mali",
			"code": "ML",
			"flag": "/demo/res/img/ml.png"
		},
		{
			"name": "Malta",
			"code": "MT",
			"flag": "/demo/res/img/mt.png"
		},
		{
			"name": "Marshall Islands",
			"code": "MH",
			"flag": "/demo/res/img/mh.png"
		},
		{
			"name": "Martinique",
			"code": "MQ",
			"flag": "/demo/res/img/mq.png"
		},
		{
			"name": "Mauritania",
			"code": "MR",
			"flag": "/demo/res/img/mr.png"
		},
		{
			"name": "Mauritius",
			"code": "MU",
			"flag": "/demo/res/img/mu.png"
		},
		{
			"name": "Mayotte",
			"code": "YT",
			"flag": "/demo/res/img/yt.png"
		},
		{
			"name": "Mexico",
			"code": "MX",
			"flag": "/demo/res/img/mx.png"
		},
		{
			"name": "Micronesia, Federated States of",
			"code": "FM",
			"flag": "/demo/res/img/fm.png"
		},
		{
			"name": "Moldova, Republic of",
			"code": "MD",
			"flag": "/demo/res/img/md.png"
		},
		{
			"name": "Monaco",
			"code": "MC",
			"flag": "/demo/res/img/mc.png"
		},
		{
			"name": "Mongolia",
			"code": "MN",
			"flag": "/demo/res/img/mn.png"
		},
		{
			"name": "Montserrat",
			"code": "MS",
			"flag": "/demo/res/img/ms.png"
		},
		{
			"name": "Morocco",
			"code": "MA",
			"flag": "/demo/res/img/ma.png"
		},
		{
			"name": "Mozambique",
			"code": "MZ",
			"flag": "/demo/res/img/mz.png"
		},
		{
			"name": "Myanmar",
			"code": "MM",
			"flag": "/demo/res/img/mm.png"
		},
		{
			"name": "Namibia",
			"code": "NA",
			"flag": "/demo/res/img/na.png"
		},
		{
			"name": "Nauru",
			"code": "NR",
			"flag": "/demo/res/img/nr.png"
		},
		{
			"name": "Nepal",
			"code": "NP",
			"flag": "/demo/res/img/np.png"
		},
		{
			"name": "Netherlands",
			"code": "NL",
			"flag": "/demo/res/img/nl.png"
		},
		{
			"name": "Netherlands Antilles",
			"code": "AN",
			"flag": "/demo/res/img/an.png"
		},
		{
			"name": "New Caledonia",
			"code": "NC",
			"flag": "/demo/res/img/nc.png"
		},
		{
			"name": "New Zealand",
			"code": "NZ",
			"flag": "/demo/res/img/nz.png"
		},
		{
			"name": "Nicaragua",
			"code": "NI",
			"flag": "/demo/res/img/ni.png"
		},
		{
			"name": "Niger",
			"code": "NE",
			"flag": "/demo/res/img/ne.png"
		},
		{
			"name": "Nigeria",
			"code": "NG",
			"flag": "/demo/res/img/ng.png"
		},
		{
			"name": "Niue",
			"code": "NU",
			"flag": "/demo/res/img/nu.png"
		},
		{
			"name": "Norfolk Island",
			"code": "NF",
			"flag": "/demo/res/img/nf.png"
		},
		{
			"name": "Northern Mariana Islands",
			"code": "MP",
			"flag": "/demo/res/img/mp.png"
		},
		{
			"name": "Norway",
			"code": "NO",
			"flag": "/demo/res/img/no.png"
		},
		{
			"name": "Oman",
			"code": "OM",
			"flag": "/demo/res/img/om.png"
		},
		{
			"name": "Pakistan",
			"code": "PK",
			"flag": "/demo/res/img/pk.png"
		},
		{
			"name": "Palau",
			"code": "PW",
			"flag": "/demo/res/img/pw.png"
		},
		{
			"name": "Palestinian Territory, Occupied",
			"code": "PS",
			"flag": "/demo/res/img/ps.png"
		},
		{
			"name": "Panama",
			"code": "PA",
			"flag": "/demo/res/img/pa.png"
		},
		{
			"name": "Papua New Guinea",
			"code": "PG",
			"flag": "/demo/res/img/pg.png"
		},
		{
			"name": "Paraguay",
			"code": "PY",
			"flag": "/demo/res/img/py.png"
		},
		{
			"name": "Peru",
			"code": "PE",
			"flag": "/demo/res/img/pe.png"
		},
		{
			"name": "Philippines",
			"code": "PH",
			"flag": "/demo/res/img/ph.png"
		},
		{
			"name": "Pitcairn",
			"code": "PN",
			"flag": "/demo/res/img/pn.png"
		},
		{
			"name": "Poland",
			"code": "PL",
			"flag": "/demo/res/img/pl.png"
		},
		{
			"name": "Portugal",
			"code": "PT",
			"flag": "/demo/res/img/pt.png"
		},
		{
			"name": "Puerto Rico",
			"code": "PR",
			"flag": "/demo/res/img/pr.png"
		},
		{
			"name": "Qatar",
			"code": "QA",
			"flag": "/demo/res/img/qa.png"
		},
		{
			"name": "Reunion",
			"code": "RE",
			"flag": "/demo/res/img/re.png"
		},
		{
			"name": "Romania",
			"code": "RO",
			"flag": "/demo/res/img/ro.png"
		},
		{
			"name": "Russian Federation",
			"code": "RU",
			"flag": "/demo/res/img/ru.png"
		},
		{
			"name": "RWANDA",
			"code": "RW",
			"flag": "/demo/res/img/rw.png"
		},
		{
			"name": "Saint Helena",
			"code": "SH",
			"flag": "/demo/res/img/sh.png"
		},
		{
			"name": "Saint Kitts and Nevis",
			"code": "KN",
			"flag": "/demo/res/img/kn.png"
		},
		{
			"name": "Saint Lucia",
			"code": "LC",
			"flag": "/demo/res/img/lc.png"
		},
		{
			"name": "Saint Pierre and Miquelon",
			"code": "PM",
			"flag": "/demo/res/img/pm.png"
		},
		{
			"name": "Saint Vincent and the Grenadines",
			"code": "VC",
			"flag": "/demo/res/img/vc.png"
		},
		{
			"name": "Samoa",
			"code": "WS",
			"flag": "/demo/res/img/ws.png"
		},
		{
			"name": "San Marino",
			"code": "SM",
			"flag": "/demo/res/img/sm.png"
		},
		{
			"name": "Sao Tome and Principe",
			"code": "ST",
			"flag": "/demo/res/img/st.png"
		},
		{
			"name": "Saudi Arabia",
			"code": "SA",
			"flag": "/demo/res/img/sa.png"
		},
		{
			"name": "Senegal",
			"code": "SN",
			"flag": "/demo/res/img/sn.png"
		},
		{
			"name": "Serbia and Montenegro",
			"code": "CS",
			"flag": "/demo/res/img/cs.png"
		},
		{
			"name": "Seychelles",
			"code": "SC",
			"flag": "/demo/res/img/sc.png"
		},
		{
			"name": "Sierra Leone",
			"code": "SL",
			"flag": "/demo/res/img/sl.png"
		},
		{
			"name": "Singapore",
			"code": "SG",
			"flag": "/demo/res/img/sg.png"
		},
		{
			"name": "Slovakia",
			"code": "SK",
			"flag": "/demo/res/img/sk.png"
		},
		{
			"name": "Slovenia",
			"code": "SI",
			"flag": "/demo/res/img/si.png"
		},
		{
			"name": "Solomon Islands",
			"code": "SB",
			"flag": "/demo/res/img/sb.png"
		},
		{
			"name": "Somalia",
			"code": "SO",
			"flag": "/demo/res/img/so.png"
		},
		{
			"name": "South Africa",
			"code": "ZA",
			"flag": "/demo/res/img/za.png"
		},
		{
			"name": "South Georgia and the South Sandwich Islands",
			"code": "GS",
			"flag": "/demo/res/img/gs.png"
		},
		{
			"name": "Spain",
			"code": "ES",
			"flag": "/demo/res/img/es.png"
		},
		{
			"name": "Sri Lanka",
			"code": "LK",
			"flag": "/demo/res/img/lk.png"
		},
		{
			"name": "Sudan",
			"code": "SD",
			"flag": "/demo/res/img/sd.png"
		},
		{
			"name": "Suriname",
			"code": "SR",
			"flag": "/demo/res/img/sr.png"
		},
		{
			"name": "Svalbard and Jan Mayen",
			"code": "SJ",
			"flag": "/demo/res/img/sj.png"
		},
		{
			"name": "Swaziland",
			"code": "SZ",
			"flag": "/demo/res/img/sz.png"
		},
		{
			"name": "Sweden",
			"code": "SE",
			"flag": "/demo/res/img/se.png"
		},
		{
			"name": "Switzerland",
			"code": "CH",
			"flag": "/demo/res/img/ch.png"
		},
		{
			"name": "Syrian Arab Republic",
			"code": "SY",
			"flag": "/demo/res/img/sy.png"
		},
		{
			"name": "Taiwan, Province of China",
			"code": "TW",
			"flag": "/demo/res/img/tw.png"
		},
		{
			"name": "Tajikistan",
			"code": "TJ",
			"flag": "/demo/res/img/tj.png"
		},
		{
			"name": "Tanzania, United Republic of",
			"code": "TZ",
			"flag": "/demo/res/img/tz.png"
		},
		{
			"name": "Thailand",
			"code": "TH",
			"flag": "/demo/res/img/th.png"
		},
		{
			"name": "Timor-Leste",
			"code": "TL",
			"flag": "/demo/res/img/tl.png"
		},
		{
			"name": "Togo",
			"code": "TG",
			"flag": "/demo/res/img/tg.png"
		},
		{
			"name": "Tokelau",
			"code": "TK",
			"flag": "/demo/res/img/tk.png"
		},
		{
			"name": "Tonga",
			"code": "TO",
			"flag": "/demo/res/img/to.png"
		},
		{
			"name": "Trinidad and Tobago",
			"code": "TT",
			"flag": "/demo/res/img/tt.png"
		},
		{
			"name": "Tunisia",
			"code": "TN",
			"flag": "/demo/res/img/tn.png"
		},
		{
			"name": "Turkey",
			"code": "TR",
			"flag": "/demo/res/img/tr.png"
		},
		{
			"name": "Turkmenistan",
			"code": "TM",
			"flag": "/demo/res/img/tm.png"
		},
		{
			"name": "Turks and Caicos Islands",
			"code": "TC",
			"flag": "/demo/res/img/tc.png"
		},
		{
			"name": "Tuvalu",
			"code": "TV",
			"flag": "/demo/res/img/tv.png"
		},
		{
			"name": "Uganda",
			"code": "UG",
			"flag": "/demo/res/img/ug.png"
		},
		{
			"name": "Ukraine",
			"code": "UA",
			"flag": "/demo/res/img/ua.png"
		},
		{
			"name": "United Arab Emirates",
			"code": "AE",
			"flag": "/demo/res/img/ae.png"
		},
		{
			"name": "United Kingdom",
			"code": "GB",
			"flag": "/demo/res/img/gb.png"
		},
		{
			"name": "United States",
			"code": "US",
			"flag": "/demo/res/img/us.png"
		},
		{
			"name": "United States Minor Outlying Islands",
			"code": "UM",
			"flag": "/demo/res/img/um.png"
		},
		{
			"name": "Uruguay",
			"code": "UY",
			"flag": "/demo/res/img/uy.png"
		},
		{
			"name": "Uzbekistan",
			"code": "UZ",
			"flag": "/demo/res/img/uz.png"
		},
		{
			"name": "Vanuatu",
			"code": "VU",
			"flag": "/demo/res/img/vu.png"
		},
		{
			"name": "Venezuela",
			"code": "VE",
			"flag": "/demo/res/img/ve.png"
		},
		{
			"name": "Vietnam",
			"code": "VN",
			"flag": "/demo/res/img/vn.png"
		},
		{
			"name": "Virgin Islands, British",
			"code": "VG",
			"flag": "/demo/res/img/vg.png"
		},
		{
			"name": "Virgin Islands, U.S.",
			"code": "VI",
			"flag": "/demo/res/img/vi.png"
		},
		{
			"name": "Wallis and Futuna",
			"code": "WF",
			"flag": "/demo/res/img/wf.png"
		},
		{
			"name": "Western Sahara",
			"code": "EH",
			"flag": "/demo/res/img/eh.png"
		},
		{
			"name": "Yemen",
			"code": "YE",
			"flag": "/demo/res/img/ye.png"
		},
		{
			"name": "Zambia",
			"code": "ZM",
			"flag": "/demo/res/img/zm.png"
		},
		{
			"name": "Zimbabwe",
			"code": "ZW",
			"flag": "/demo/res/img/zw.png"
		}
	];

/***/ },

/***/ 481:
/***/ function(module, exports) {

	module.exports = "/*\n * Top navigation\n * Hide default border to remove 1px line.\n */\n.navbar-fixed-top {\n  border: 0;\n}\n\n/*\n * Main content\n */\n\n.main {\n  padding: 5rem;\n}\n\n.completer-wrapper {\n    border-radius: 25px;\n    background: lightgray;\n}\n\n:host >>> .match {\n  color: orangered;\n}"

/***/ },

/***/ 482:
/***/ function(module, exports) {

	module.exports = "<nav class=\"navbar navbar-dark navbar-fixed-top bg-inverse\">\n    <a class=\"navbar-brand\" href=\"#\">ng2-completer demo</a>\n</nav>\n<div class=\"container main\">\n    <div class=\"row\">\n        <h1>Completer </h1>\n    </div>\n    <h2>Local data with image</h2>\n    <div class=\"row completer-wrapper m-a-1\">\n        <div class=\"col-md-offset-1\">\n            <div class=\"row\">\n                <p>Local data of countries - using image, matchClass and maxLength</p>\n            </div>\n            <div class=\"row\">\n                <ng2-completer [(ngModel)]=\"countryName\" [dataService]=\"dataService\" [minSearchLength]=\"0\" [maxChars]=\"4\" [placeholder]=\"'search country'\"\n                    [matchClass]=\"'match'\">\n                </ng2-completer>\n            </div>\n            <div class=\"row\">\n                <p>Selected country: {{countryName}}</p>\n            </div>\n        </div>\n    </div>\n    <h2>Local data with description</h2>\n    <div class=\"row completer-wrapper m-a-1\">\n        <div class=\"col-md-offset-1\">\n            <div class=\"row\">\n                <p>Local data of quotes - using desription, textNoResults, matchClass and selected event</p>\n            </div>\n            <div class=\"row\">\n                <ng2-completer [dataService]=\"dataService2\" (selected)=\"onQuoteSelected($event)\" [minSearchLength]=\"0\" [placeholder]=\"'search quote by author name'\"\n                    [textNoResults]=\"'No quotes found'\" [matchClass]=\"'match'\">\n                </ng2-completer>\n            </div>\n            <div class=\"row\">\n                <p>Quote: {{quote}}</p>\n            </div>\n        </div>\n    </div>\n    \n    <h2>Remote data</h2>\n    <div class=\"row completer-wrapper m-a-1\">\n        <div class=\"col-md-offset-1\">\n            <div class=\"row\">\n                <p>Remote data of countries with minSearchLength, textSearching and clearSelected</p>\n            </div>\n            <div class=\"row\">\n                <ng2-completer [dataService]=\"dataRemote\" [minSearchLength]=\"3\" [placeholder]=\"'search country'\" [clearSelected]=\"true\" (selected)=\"onCountrySelected($event)\"\n                    [textSearching]=\"'Please wait...'\">\n                </ng2-completer>\n            </div>\n            <div class=\"row\">\n                <p>Selected country: {{countryName2}}</p>\n            </div>\n        </div>\n    </div>\n\n    <h2>Input disabled</h2>\n    <div class=\"row completer-wrapper m-a-1\">\n        <div class=\"col-md-offset-1\">\n            <div class=\"row\">\n                <p>Local data of countries - overrideSuggested, inputDisabled and fieldTabindex</p>\n            </div>\n            <div class=\"row\">\n                <ng2-completer [(ngModel)]=\"countryName3\" [dataService]=\"dataService3\" [minSearchLength]=\"0\" [placeholder]=\"'search country'\"\n                    [overrideSuggested]=\"true\" [disableInput]=\"searchcb\" [fieldTabindex]=\"-1\">\n                </ng2-completer>\n            </div>\n            <div class=\"row\">\n                <p>Selected: {{countryName3}}</p>\n            </div>\n            <div class=\"row\">\n                <label>Disable search</label>\n                <input type=\"checkbox\" [(ngModel)]=\"searchcb\" />\n            </div>\n        </div>\n    </div>\n\n    <h2>Automatch</h2>\n    <div class=\"row completer-wrapper m-a-1\">\n        <div class=\"col-md-offset-1\">\n            <form>\n                <div class=\"row\">\n                    <p>Local data of countries - autoMatch and required</p>\n                </div>\n                <div class=\"row\">\n                    <ng2-completer name=\"countryRequired\" [dataService]=\"dataService4\" [(ngModel)]=\"countryName4\" [minSearchLength]=\"0\" [placeholder]=\"'search country'\"\n                        #countryRequired=\"ngModel\" [autoMatch]=\"true\" required>\n                    </ng2-completer>\n                    <div [hidden]=\"countryRequired.valid\" class=\"col-md-6 alert alert-danger\">\n                        Country is required\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <p>Selected: {{countryName4}}</p>\n                </div>\n            </form>\n        </div>\n    </div>\n</div>"

/***/ }

});
//# sourceMappingURL=ng2-completer-demo.js.map