import { Provider } from "@angular/core";
import { Http } from "@angular/http";
import { LocalData } from "./local-data";
import { RemoteData } from "./remote-data";
export declare function localDataFactory(): () => LocalData;
export declare function remoteDataFactory(http: Http): () => RemoteData;
export declare let AUTOCOMPLET_DATA_PROVIDES: Provider[];
