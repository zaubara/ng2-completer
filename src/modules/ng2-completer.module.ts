import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { CompleterCmp } from '../components/completer-cmp';
import { CompleterListItemCmp } from '../components/completer-list-item-cmp';
import { LocalDataFactory } from '../services/local-data-factory';
import { RemoteDataFactory } from '../services/remote-data-factory';
import { CompleterDataService } from '../services/completer-data.service';

import { CtrCompleter } from '../directives/ctr-completer';
import { CtrDropdown } from '../directives/ctr-dropdown';
import { CtrInput } from '../directives/ctr-input.directive';
import { CtrList } from '../directives/ctr-list';
import { CtrRow } from '../directives/ctr-row';
import { CompleterContainerComponent } from '../components/completer-container.component';

const providers = [
    CompleterDataService,
    LocalDataFactory,
    RemoteDataFactory
];

@NgModule({
    declarations: [
        CompleterListItemCmp,
        CtrCompleter,
        CtrDropdown,
        CtrInput,
        CtrList,
        CtrRow,
        CompleterCmp,
        CompleterContainerComponent
    ],
    exports: [
        CompleterListItemCmp,
        CtrCompleter,
        CtrDropdown,
        CtrInput,
        CtrList,
        CtrRow,
        CompleterCmp,
        CompleterContainerComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        OverlayModule
    ],
    providers
})
export class Ng2CompleterModule {

    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: Ng2CompleterModule,
            providers
        };
    }

    public static forChild(): ModuleWithProviders {
        return {
            ngModule: Ng2CompleterModule,
            providers
        };
    }
}
