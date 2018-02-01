import { Component, ViewEncapsulation, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { tap, pairwise } from 'rxjs/operators';

import { StoreService } from './../store/store.service';
import { CompleterState } from './../store/completer-state';

@Component({
    encapsulation: ViewEncapsulation.None,
    providers: [StoreService],
    selector: 'ctr-container',
    template: `
        <ng-content select="[ctrInput]"></ng-content>
        <ng-template>
            <ng-content select=".ctr-autocomplete"></ng-content>
        </ng-template>
    `
})
export class CompleterContainerComponent implements AfterViewInit {

    @ViewChild(TemplateRef) private template: TemplateRef<any>;

    private subscription = new Subscription();

    constructor(private storeService: StoreService) {
        this.subscription.add(
            storeService.asObservable()
                .pipe(
                tap((states) => {
                    this.onFocusChanged(states[0], states[1]);
                })
                )
                .subscribe()
        );
    }

    public ngAfterViewInit() {
        this.storeService.update('templateRef', this.template);
    }

    private onFocusChanged(prevState: CompleterState, newState: CompleterState) {
        if (prevState.focus !== newState.focus && newState.focus !== newState.open) {
            this.storeService.update('open', newState.focus);
        }
    }
}
