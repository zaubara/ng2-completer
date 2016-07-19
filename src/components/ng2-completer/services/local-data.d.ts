import { CompleterBaseData } from "./completer-base-data";
export declare class LocalData extends CompleterBaseData {
    private _data;
    constructor();
    data(data: any[]): this;
    search(term: string): void;
}
