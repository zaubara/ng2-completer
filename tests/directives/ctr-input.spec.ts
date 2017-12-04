import { inject, TestBed, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, ViewChild, TemplateRef } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { tap, skip } from 'rxjs/operators';

import { StoreService } from './../../src/store/store.service';
import { CtrInput } from './../../src/directives/ctr-input.directive';
import { noop } from './../../src/globals';

describe('CtrInput', () => {

    let comp: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CtrInput, TestComponent],
            imports: [OverlayModule],
            providers: [StoreService]
        });

        fixture = TestBed.createComponent(TestComponent);
        comp = fixture.componentInstance;
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
});

@Component({
    selector: 'ctr-test',
    template: `
        <input ctrInput/>
        <ng-template>
            <div class="ctr-autocomplete"></div>
        </ng-template>
    `
})
export class TestComponent {
    @ViewChild(TemplateRef) public template: TemplateRef<any>;
}
