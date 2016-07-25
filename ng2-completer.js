(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/forms"), require("@angular/http"), require("rxjs/Observable"), require("rxjs/Subject"), require("rxjs/add/operator/catch"), require("rxjs/add/operator/map"));
	else if(typeof define === 'function' && define.amd)
		define("ng2-completer", ["@angular/core", "@angular/forms", "@angular/http", "rxjs/Observable", "rxjs/Subject", "rxjs/add/operator/catch", "rxjs/add/operator/map"], factory);
	else if(typeof exports === 'object')
		exports["ng2-completer"] = factory(require("@angular/core"), require("@angular/forms"), require("@angular/http"), require("rxjs/Observable"), require("rxjs/Subject"), require("rxjs/add/operator/catch"), require("rxjs/add/operator/map"));
	else
		root["ng2-completer"] = factory(root["@angular/core"], root["@angular/forms"], root["@angular/http"], root["rxjs/Observable"], root["rxjs/Subject"], root["rxjs/add/operator/catch"], root["rxjs/add/operator/map"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_15__, __WEBPACK_EXTERNAL_MODULE_16__, __WEBPACK_EXTERNAL_MODULE_17__, __WEBPACK_EXTERNAL_MODULE_18__, __WEBPACK_EXTERNAL_MODULE_19__, __WEBPACK_EXTERNAL_MODULE_20__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var completer_cmp_1 = __webpack_require__(6);
	exports.CompleterCmp = completer_cmp_1.CompleterCmp;
	var completer_data_factory_1 = __webpack_require__(9);
	exports.COMPLETER_DATA_PROVIDERS = completer_data_factory_1.COMPLETER_DATA_PROVIDERS;
	var completer_service_1 = __webpack_require__(5);
	exports.CompleterService = completer_service_1.CompleterService;
	var local_data_1 = __webpack_require__(3);
	exports.LocalData = local_data_1.LocalData;
	var remote_data_1 = __webpack_require__(4);
	exports.RemoteData = remote_data_1.RemoteData;
	var completer_base_data_1 = __webpack_require__(2);
	exports.CompleterBaseData = completer_base_data_1.CompleterBaseData;


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("@angular/core");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1 = __webpack_require__(18);
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
/* 3 */
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
	var core_1 = __webpack_require__(1);
	var completer_base_data_1 = __webpack_require__(2);
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	__webpack_require__(20);
	var completer_base_data_1 = __webpack_require__(2);
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
/* 5 */
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
	var core_1 = __webpack_require__(1);
	var local_data_1 = __webpack_require__(3);
	var remote_data_1 = __webpack_require__(4);
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
/* 6 */
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
	var core_1 = __webpack_require__(1);
	var forms_1 = __webpack_require__(15);
	var Observable_1 = __webpack_require__(17);
	var completer_list_cmp_1 = __webpack_require__(7);
	__webpack_require__(19);
	var template = __webpack_require__(11);
	var defaultStyles = __webpack_require__(10);
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
/* 7 */
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
	var core_1 = __webpack_require__(1);
	var completer_list_item_cmp_1 = __webpack_require__(8);
	var template = __webpack_require__(13);
	var defaultStyles = __webpack_require__(12);
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
/* 8 */
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
	var core_1 = __webpack_require__(1);
	var template = __webpack_require__(14);
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var http_1 = __webpack_require__(16);
	var local_data_1 = __webpack_require__(3);
	var remote_data_1 = __webpack_require__(4);
	var completer_service_1 = __webpack_require__(5);
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
	exports.COMPLETER_DATA_PROVIDERS = [
	    core_1.provide(local_data_1.LocalData, { useFactory: localDataFactory }),
	    core_1.provide(remote_data_1.RemoteData, { useFactory: remoteDataFactory, deps: [http_1.Http] }),
	    core_1.provide(completer_service_1.CompleterService, { useClass: completer_service_1.CompleterService })
	];


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = ""

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = "<div class=\"completer-holder\">\n    <input class=\"completer-input\"\n        [(ngModel)]=\"searchStr\"\n        (keyup)=\"keyupHandler($event)\"\n        (keydown)=\"keydownHandler($event)\"\n        [attr.name]=\"inputName\"\n        [placeholder]=\"placeholder\"\n        [attr.maxlength]=\"maxChars\"\n        (blur)=\"onBlur()\"\n        [tabindex]=\"fieldTabindex\"\n        [disabled]=\"disableInput\"\n        completer=\"off\"\n        autocorrect=\"off\"\n        autocapitalize=\"off\"\n    />\n    <completer-list *ngIf=\"showDropdown\" class=\"completer-dropdown-holder\" [results]=\"results\"  [searchStr]=\"searchStr\" (selected)=\"selectResult($event)\" \n       [matchClass]=\"matchClass\" [textSearching]=\"textSearching\" [searching]=\"searching\" [textNoResults]=\"textNoResults\" [displaySearching]=\"displaySearching\">\n    </completer-list>\n\n</div>"

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = ".completer-dropdown {\n    border-color: #ececec;\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 2px;\n    width: 250px;\n    padding: 6px;\n    cursor: pointer;\n    z-index: 9999;\n    position: absolute;\n    /*top: 32px;\n    left: 0px;\n    */\n    margin-top: -6px;\n    background-color: #ffffff;\n}\n\n.completer-row {\n    padding: 5px;\n    color: #000000;\n    margin-bottom: 4px;\n    clear: both;\n}\n\n.completer-selected-row {\n    background-color: lightblue;\n    color: #ffffff;\n}\n\n.completer-description {\n    font-size: 14px;\n}"

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = "<div class=\"completer-dropdown\">\n    <div *ngIf=\"searching && displaySearching\" class=\"completer-searching\">{{textSearching}}</div>\n    <div *ngIf=\"!searching && (!results || results.length == 0)\" class=\"completer-no-results\">{{textNoResults}}</div>\n    <div class=\"completer-row\" *ngFor=\"let result of results; let i=index\" (mouseenter)=\"hoverRow(i)\" (click)=\"onClick(result)\" [ngClass]=\"{'completer-selected-row': i == currentIndex}\">\n        <div *ngIf=\"result.image && result.image != ''\" class=\"completer-image-holder\">\n            <img *ngIf=\"result.image && result.image != ''\" src=\"{{result.image}}\" class=\"completer-image\" />\n            <div *ngIf=\"!result.image && result.image != ''\" class=\"completer-image-default\"></div>\n        </div>\n        <completer-list-item class=\"completer-title\" [text]=\"result.title\" [matchClass]=\"matchClass\" [searchStr]=\"searchStr\" [type]=\"'title'\"></completer-list-item>\n        <completer-list-item *ngIf=\"result.description && result.description != ''\" class=\"completer-description\"\n            [text]=\"result.description\" [matchClass]=\"matchClass\" [searchStr]=\"searchStr\" [type]=\"'description'\">\n        </completer-list-item>\n\n        <!--<div ng-if=\"matchClass && result.description && result.description != \\'\\'\" class=\"angucomplete-description\" ng-bind-html=\"result.description\"></div>-->\n        <!--<div *ngIf=\"!matchClass && result.description && result.description != ''\" class=\"completer-description\">{{result.description}}</div>-->\n    </div>\n</div>"

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = "<div class=\"completer-list-item-holder\" [ngClass]=\"{'completer-title': type === 'title', 'completer-description': type === 'description'}\" >\n    <span class=\"completer-list-item\" *ngFor=\"let part of parts\" [ngClass]=\"part.isMatch ? matchClass : null\">{{part.text}}</span>\n</div>"

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("@angular/forms");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("@angular/http");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("rxjs/Observable");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("rxjs/Subject");

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("rxjs/add/operator/catch");

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("rxjs/add/operator/map");

/***/ }
/******/ ])
});
;
//# sourceMappingURL=ng2-completer.js.map