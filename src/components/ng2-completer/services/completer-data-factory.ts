import {Provider, provide} from "@angular/core";
import {Http} from "@angular/http";

import {LocalData} from "./local-data";
import {RemoteData} from "./remote-data";
import {CompleterService} from "./completer-service";


export function localDataFactory () {
    return () => {
        return new LocalData();
    };
}

export function remoteDataFactory (http: Http) {
    return () => {
        return new RemoteData(http);
    };
}

export let AUTOCOMPLET_DATA_PROVIDES: Provider[] = [
    provide(LocalData, {useFactory: localDataFactory}),
    provide(RemoteData, {useFactory: remoteDataFactory, deps: [Http]}),
    provide(CompleterService, {useClass: CompleterService})
];
