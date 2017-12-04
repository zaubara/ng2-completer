import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { distinctUntilChanged, pairwise, map } from 'rxjs/operators';
import deepEqual = require('deep-equal');

import { CompleterState, CTR_INITIAL_STATE } from './../store/completer-state';

@Injectable()
export class StoreService {
    private stateChangedEvent = new EventEmitter<{ key: keyof CompleterState, value: any }>(true);
    private state$ = new BehaviorSubject<CompleterState>(CTR_INITIAL_STATE);

    constructor() {
        this.stateChangedEvent.pipe(
            map((change) => ({
                ...this.state,
                [change.key]: change.value
            }))
        )
            .subscribe(this.state$);
    }

    public get state() {
        return this.state$.getValue();
    }

    public update(key: keyof CompleterState, value: any) {
        this.stateChangedEvent.emit({ key, value });
    }

    public asObservable() {
        return this.state$.asObservable().pipe(
            distinctUntilChanged((state, otherState) => {
                return deepEqual(state, otherState);
            }),
            pairwise()
        );
    }
}
