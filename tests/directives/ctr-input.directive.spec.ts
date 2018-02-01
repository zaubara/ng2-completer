import { inject, TestBed, fakeAsync, tick, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, ViewChild, TemplateRef } from '@angular/core';
import { OverlayModule, OverlayContainer } from '@angular/cdk/overlay';
import { tap, skip } from 'rxjs/operators';

import { StoreService } from './../../src/store/store.service';
import { CtrInput } from './../../src/directives/ctr-input.directive';
import { noop } from './../../src/globals';

describe('CtrInput', () => {

    let comp: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CtrInput, TestComponent],
            imports: [OverlayModule],
            providers: [StoreService]
        });

        fixture = TestBed.createComponent(TestComponent);
        comp = fixture.componentInstance;

        inject([OverlayContainer], (oc: OverlayContainer) => {
            overlayContainer = oc;
            overlayContainerElement = oc.getContainerElement();
        })();

        fixture.detectChanges();
        fixture.whenStable();
        tick();
    }));

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    it(
        'should update the state when receiving focus',
        inject([StoreService], (service: StoreService) => {
            spyOn(service, 'update').and.callFake(noop);

            const de = fixture.debugElement.query(By.css('input'));
            de.nativeElement.focus();

            expect(service.update).toHaveBeenCalledWith('focus', true);
        })
    );

    it(
        'should update the state on blur',
        inject([StoreService], (service: StoreService) => {

            const de = fixture.debugElement.query(By.css('input'));
            de.nativeElement.focus();

            spyOn(service, 'update').and.callFake(noop);
            de.nativeElement.blur();

            expect(service.update).toHaveBeenCalledWith('focus', false);
        })
    );

    it(
        'should open a dropdown when open state changes to true',
        fakeAsync(inject([StoreService], (service: StoreService) => {
            service.update('templateRef', comp.template);
            tick();

            let de = fixture.debugElement.query(By.css('.ctr-autocomplete'));
            expect(!de).toBe(true, 'dropdown should be closed');

            service.update('open', true);
            tick();

            de = fixture.debugElement.query(By.css('.ctr-autocomplete'));
            expect(!!de).toBe(true, 'dropdown should be opened');
        }))
    );

    it(
        'should close the dropdown when open state changes to false',
        async(inject([StoreService], (service: StoreService) => {

            fixture.ngZone!.run(() => {
                service.update('templateRef', comp.template);
                service.update('open', true);
            });
            return fixture.whenStable()
                .then(() => {
                    expect(overlayContainerElement.textContent!.trim()).toBe('test', 'dropdown should be opened');

                    fixture.ngZone!.run(() => {
                        service.update('open', false);
                    });
                    fixture.detectChanges();
                    return fixture.whenStable();
                })
                .then(() => {
                    expect(overlayContainerElement.textContent!.trim()).toBe('', 'dropdown should be closed');
                });
        }))
    );

    it(
        'should reuse the overlay if closed and reopened',
        fakeAsync(inject([StoreService], (service: StoreService) => {
            service.update('templateRef', comp.template);
            service.update('open', true);
            tick();

            service.update('open', false);
            tick();

            service.update('open', true);
            tick();

            const overlays = fixture.nativeElement.parentElement.querySelectorAll('.cdk-overlay-pane');
            expect(overlays.length).toBe(1);
        }))
    );
});

@Component({
    selector: 'ctr-test',
    template: `
        <input ctrInput/>
        <ng-template>
            <div class="ctr-autocomplete">test</div>
        </ng-template>
    `
})
export class TestComponent {
    @ViewChild(TemplateRef) public template: TemplateRef<any>;
}
