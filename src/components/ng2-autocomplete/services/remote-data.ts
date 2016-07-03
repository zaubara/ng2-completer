import {Http, Response} from "@angular/http";
import {Subscription} from "rxjs";


import {AutocompleteDataBase} from "./autocomplete-data-base";

export class RemoteData extends AutocompleteDataBase {
    private _remoteUrl: string;
    private remoteSearch: Subscription;

    constructor(private http: Http) {
        super();
    }

    public remoteUrl(remoteUrl: string) {
        this._remoteUrl = remoteUrl;
        return this;
    }

    public search(term: string): void {
        this.cancel();
        // let params = {};
        let url = this._remoteUrl + encodeURIComponent(term);
        // if (scope.remoteUrlRequestFormatter) {
        //   params = {params: scope.remoteUrlRequestFormatter(str)};
        //   url = scope.remoteUrl;
        // }
        // if (!!scope.remoteUrlRequestWithCredentials) {
        //   params.withCredentials = true;
        // }
        this.remoteSearch = this.http.get(url)
            .map((res: Response) => res.json())
            .map((data: any) => {
                return this.extractMatches(data, term);
            })
            .map(
            (matches: any[]) => {
                let results = this.processResults(matches, term);
                this.next(results);
                return results;
            })
            .catch((err) =>  {
                this.error(err);
                return null;
            })
            .subscribe();
    }

    public cancel() {
        if (this.remoteSearch) {
            this.remoteSearch.unsubscribe();
        }
    }


}
