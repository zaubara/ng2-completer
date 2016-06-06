webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(164);


/***/ },

/***/ 163:
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
	var AutocompleteList = (function () {
	    function AutocompleteList() {
	        this.selected = new core_1.EventEmitter();
	    }
	    AutocompleteList.prototype.onClick = function (item) {
	        this.selected.emit(item);
	    };
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], AutocompleteList.prototype, "selected", void 0);
	    AutocompleteList = __decorate([
	        core_1.Component({
	            selector: "autocomplete-list",
	            template: "<div class=\"dropdown-menu  search-results\">\n                    <a *ngFor=\"let item of list\" class=\"dropdown-item\" (click)=\"onClick(item)\">{{item.text}}</a>\n               </div>",
	            styles: [".search-results { position: relative; right: 0; display: block; padding: 0; overflow: hidden; font-size: .9rem;}"]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], AutocompleteList);
	    return AutocompleteList;
	}());
	exports.AutocompleteList = AutocompleteList;


/***/ },

/***/ 164:
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
	var autocomplete_list_1 = __webpack_require__(163);
	var AutocompleteDirective = (function () {
	    function AutocompleteDirective(viewRef, dcl) {
	        this.viewRef = viewRef;
	        this.dcl = dcl;
	        this.selected = new core_1.EventEmitter();
	        this.term = "";
	        this.listCmp = undefined;
	        this.refreshTimer = undefined;
	        this.searchInProgress = false;
	        this.searchRequired = false;
	    }
	    AutocompleteDirective.prototype.onKey = function (event) {
	        var _this = this;
	        if (!this.refreshTimer) {
	            this.refreshTimer = setTimeout(function () {
	                if (!_this.searchInProgress) {
	                    _this.doSearch();
	                }
	                else {
	                    _this.searchRequired = true;
	                }
	            }, 200);
	        }
	        this.term = event.target.value;
	        if (this.term === "" && this.listCmp) {
	            this.removeList();
	        }
	    };
	    AutocompleteDirective.prototype.ngOnInit = function () {
	        var _this = this;
	        this.selected.subscribe(function () {
	            _this.removeList();
	        });
	    };
	    AutocompleteDirective.prototype.doSearch = function () {
	        var _this = this;
	        this.refreshTimer = undefined;
	        if (this.search && this.term !== "") {
	            this.searchInProgress = true;
	            this.search(this.term)
	                .then(function (res) {
	                _this.searchInProgress = false;
	                if (_this.searchRequired) {
	                    _this.searchRequired = false;
	                    _this.doSearch();
	                }
	                else {
	                    _this.diplayList(res);
	                }
	            })
	                .catch(function (err) {
	                console.log("search error:", err);
	                _this.removeList();
	            });
	        }
	    };
	    AutocompleteDirective.prototype.diplayList = function (list) {
	        var _this = this;
	        if (!this.listCmp) {
	            this.dcl.loadNextToLocation(autocomplete_list_1.AutocompleteList, this.viewRef)
	                .then(function (cmp) {
	                _this.listCmp = cmp;
	                _this.updateList(list);
	                (_this.listCmp.instance).selected
	                    .subscribe(function (selectedItem) {
	                    _this.selected.emit(selectedItem);
	                });
	            });
	        }
	        else {
	            this.updateList(list);
	        }
	    };
	    AutocompleteDirective.prototype.updateList = function (list) {
	        if (this.listCmp) {
	            (this.listCmp.instance).list = list;
	        }
	    };
	    AutocompleteDirective.prototype.removeList = function () {
	        this.searchInProgress = false;
	        this.searchRequired = false;
	        if (this.listCmp) {
	            this.listCmp.destroy();
	            this.listCmp = undefined;
	        }
	    };
	    __decorate([
	        core_1.Input("ng2-autocomplete"), 
	        __metadata('design:type', Function)
	    ], AutocompleteDirective.prototype, "search", void 0);
	    __decorate([
	        core_1.Output("ng2AutocompleteOnSelect"), 
	        __metadata('design:type', Object)
	    ], AutocompleteDirective.prototype, "selected", void 0);
	    AutocompleteDirective = __decorate([
	        core_1.Directive({
	            selector: "[ng2-autocomplete]",
	            host: {
	                "(keyup)": "onKey($event)"
	            }
	        }), 
	        __metadata('design:paramtypes', [core_1.ViewContainerRef, core_1.DynamicComponentLoader])
	    ], AutocompleteDirective);
	    return AutocompleteDirective;
	}());
	exports.AutocompleteDirective = AutocompleteDirective;


/***/ }

});
//# sourceMappingURL=ng2-autocomplete.js.map