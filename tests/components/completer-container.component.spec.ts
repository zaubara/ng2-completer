import { inject, TestBed, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, ViewChild, TemplateRef } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { tap, skip } from 'rxjs/operators';

import { StoreService } from './../../src/store/store.service';
import { noop } from './../../src/globals';
import { CompleterContainerComponent } from './../../src/components/completer-container.component';

describe('CompleterContainerComponent', () => {

    let comp: CompleterContainerComponent;
    let fixture: ComponentFixture<CompleterContainerComponent>;
    const store = new StoreService();

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CompleterContainerComponent]
        })
            .overrideComponent(CompleterContainerComponent, {
                set: {
                    providers: [{ provide: StoreService, useValue: store }]
                }
            });

        fixture = TestBed.createComponent(CompleterContainerComponent);
        comp = fixture.componentInstance;

        fixture.detectChanges();
        fixture.whenStable();
        tick();
    }));

    it(
        'should set the template ref to the store',
        fakeAsync(() => {
            expect(!!store.state.templateRef).toBe(true);
        })
    );

    it(
        'should set open state to true when focus state changes to true',
        fakeAsync(() => {
            expect(store.state.open).toBe(false);

            store.update('focus', true);
            tick();
            expect(store.state.open).toBe(true);
        })
    );

    it(
        'should not update open state when open state is already true',
        fakeAsync(() => {
            store.update('open', true);
            tick();
            store.update('focus', true);
            spyOn(store, 'update');
            tick();
            expect(store.update).not.toHaveBeenCalled();
        })
    );

    it(
        'should not update open state when focus state is already true',
        fakeAsync(() => {
            store.update('focus', true);
            tick();
            store.update('focus', true);
            spyOn(store, 'update');
            tick();
            expect(store.update).not.toHaveBeenCalled();
        })
    );

    it(
        'should set open state to false when focus state changes to false',
        fakeAsync(() => {
            store.update('open', true);
            store.update('focus', true);
            tick();

            store.update('focus', false);
            tick();
            expect(store.state.open).toBe(false);
        })
    );
});
