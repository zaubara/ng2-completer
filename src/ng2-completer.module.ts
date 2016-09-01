import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CompleterCmp } from "./components/ng2-completer/completer-cmp";
import { CompleterListCmp } from "./components/ng2-completer/completer-list-cmp";
import { CompleterListItemCmp } from "./components/ng2-completer/completer-list-item-cmp";
import { CompleterService } from "./components/ng2-completer/services/completer-service";
import { COMPLETER_DATA_PROVIDERS } from "./components/ng2-completer/services/completer-data-factory";

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpModule
    ],
    declarations: [
        CompleterCmp,
        CompleterListCmp,
        CompleterListItemCmp
    ],
    providers: [
        CompleterService,
        COMPLETER_DATA_PROVIDERS
    ],
    exports: [
        CompleterCmp
    ]
})
export class Ng2CompleterModule {}