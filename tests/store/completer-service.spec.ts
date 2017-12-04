import { Subscription } from 'rxjs/Subscription';
import { inject, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { tap, skip } from 'rxjs/operators';

import { CTR_INITIAL_STATE } from './../../src/store/completer-state';
import { StoreService } from './../../src/store/store.service';

describe('CompleterService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [StoreService]
        });
    });

    it(
        'should be initialized with CTR_INITIAL_STATE',
        inject([StoreService], (service: StoreService) => {
            expect(service.state).toEqual(CTR_INITIAL_STATE);
        })
    );

    it(
        'should update a single property',
        fakeAsync(inject([StoreService], (service: StoreService) => {
            expect(service.state.open).toEqual(CTR_INITIAL_STATE.open);

            service.update('open', !CTR_INITIAL_STATE.open);
            tick();

            expect(service.state.open).toEqual(!CTR_INITIAL_STATE.open);
        }))
    );

    it(
        'should provide an observable of current and previous state',
        fakeAsync(inject([StoreService], (service: StoreService) => {
            let valueEmitted = false;
            const state$ = service.asObservable().pipe(
                tap((states) => {
                    valueEmitted = true;
                    expect(states[0]).not.toEqual(states[1]);
                    expect(states[1].open).toBe(true);
                })
            )
                .subscribe();
            service.update('open', true);
            tick();
            expect(valueEmitted).toBe(true, 'value not emitted');
        }))
    );

    it(
        'should perform updates asynchronously',
        fakeAsync(inject([StoreService], (service: StoreService) => {
            let changeNum = 0;

            const state$ = service.asObservable().pipe(
                tap((states) => {
                    changeNum++;
                    if (service.state.open && changeNum === 1) {
                        service.update('focus', true);
                        expect(service.state.focus).toBe(false, 'focus should still be false at this point');
                    }
                })
            )
                .subscribe();

            service.update('open', true);
            expect(service.state.focus).toBe(false, 'wrong initial value for focus');
            expect(service.state.open).toBe(false, 'wrong initial value for open');
            tick();

            expect(changeNum).toBe(2);
        }))
    );
});
