# ng2-completer

Auto complete component for Angular 2.

This component is based on [angucomplete-alt](https://github.com/ghiden/angucomplete-alt)

Click for the [demo](http://oferh.github.io/ng2-completer/)

**This version is a work in progress**

## Installation

`npm install ng2-completer --save`

## Usage

`Http` and `forms` should be provided in the app: 
```
import { bootstrap } from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import { AppComponent, environment } from './app/';
import {HTTP_PROVIDERS} from '@angular/http';

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  disableDeprecatedForms(),
  provideForms()
]);
```

Add ng2-completer to your component and create a data source:

```
import { Component } from '@angular/core';
import {CompleterCmp, CompleterService, CompleterData, COMPLETER_DATA_PROVIDERS} from 'ng2-completer';

@Component({
  selector: 'my-component',
  template: `<h1>Search color</h1>
            <ng2-completer [(ngModel)]="searchStr" [dataService]="dataService" [minSearchLength]="0"></ng2-completer>`,
  directives: [CompleterCmp],
  providers: [COMPLETER_DATA_PROVIDERS, CompleterService]
})
export class MyComponent {

  private searchStr: string;
  private dataService: CompleterData;
  private searchData = [
    { color: 'red', value: '#f00' },
    { color: 'green', value: '#0f0' },
    { color: 'blue', value: '#00f' },
    { color: 'cyan', value: '#0ff' },
    { color: 'magenta', value: '#f0f' },
    { color: 'yellow', value: '#ff0' },
    { color: 'black', value: '#000' }
  ];

  constructor(private completerService: CompleterService) {
    this.dataService = completerService.local(this.searchData, 'color', 'color');
  }
}
```

ng2-completer uses [rxjs](https://github.com/Reactive-Extensions/RxJS) stream as data sources. 
There are 2 ready made data sources that can be used to fetch local and remote data but it's also possible to provide 
a custome source that generates a stream of items.

###System.js configuration

Add the following to `System.js` map configuration:
```
   var map = {
       ...
       'ng2-completer':              'node_modules/ng2-completer/bundles'
   }
```

Add the following to `System.js` packages configuration:
```
   var packages = {
       ...
       'ng2-completer':              { main: 'ng2-completer.js', format: 'cjs' }
   }
```

## API

### ng2-completer directive

|Attribute|Description|Type|Required|Default|
|:---    |:---        |:--- |:---      |:--- |
|dataService|Autocomplete list data source.|CompleterData|Yes||
|ngModel| see the angular [forms API](https://angular.io/docs/js/latest/guide/forms.html).|string|Yes||
|autoMatch|Auto select an item if it is the only result and it is an exact match of the search text.|boolean|false|
|clearSelected|Clear the input when a result is selected.|boolean|No|false|
|disableInput|If true disable the input field.|boolean|No|false|
|fieldTabindex|Set the `tabIndex` of the input.|number|No||
|inputName|`name` attribute of the input element.|string|No||
|matchClass|CSS class to apply for matching part of the title and description.|string|No||
|maxChars|Maximal number of characters that the user can type in the component.|number|No|524288|
|minSearchLength|Minimal number of characters required for searching.|number|No|3|
|overrideSuggested|If true will ovveride suggested and set the model with the value in the input field.|boolean|No|false|
|pause|Number of msec. to wait before searching.|number|No|250|
|placeholder|Placeholder text for the search field.|string|No||
|selected|Event handler that is called when an item is selected.|(selected: CompleterItem): void|No||
|textNoResults|Text displayed when the search returned no results.|string|No|
|textSearching|Text displayed while search is active.|string|No|Searching...|


### Local data

Create local data provider by calling `CompleterService.local`.

#### Parameters

|Name|Type|Description|Required|
|:---|:---|:---       |:---    |
|data|any[]|A JSON array with the data to use.|Yes|
|searchFields|string|Comma separated list of fields to search on. Fields may contain dots for nested attributes.|Yes|
|titleField|string|Name of the field to use as title for the list item.|Yes|

#### Attributes
|Name|Type|Description|
|:---|:---|:---       |
|descriptionField|string|Name of the field to use as description for the list item.|
|imageField|string|Name of the field to use as image url for the list item.|

### Remote data

Create remote data provider by calling `CompleterService.remote`.

#### Parameters

|Name|Type|Description|Required|
|:---|:---|:---       |:---    |
|url|string|Base url for the search|Yes|
|searchFields|string|Comma separated list of fields to search on. Fields may contain dots for nested attributes.|Yes|
|titleField|string|Name of the field to use as title for the list item.|Yes|

#### Attributes

|Name|Type|Description|
|:---|:---|:---       |
|descriptionField|string|Name of the field to use as description for the list item.|
|imageField|string|Name of the field to use as image url for the list item.|
|urlFormater|(term: string) => string|Function that get's the searchterm and returns the search url before each search.|
|dataField|string|The field in the response that includes the data.|

### CSS classes

* `.completer-holder`
* `.completer-input`
* `.completer-dropdown-holder` 
* `.completer-dropdown`
* `.completer-searching`
* `.completer-no-results`
* `.completer-row`
* `.completer-row`
* `.completer-image-holder`
* `.completer-image-holder`
* `.completer-image`
* `.completer-image-default`
* `.completer-image-default`
* `.completer-title`
* `.completer-description`
* `.completer-description`
* `.completer-list-item-holder`
* `.completer-list-item`
