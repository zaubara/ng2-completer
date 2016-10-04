import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
// import { HttpModule } from "@angular/http";
import { MaterialModule } from "@angular/material";

import { CompleterCmpMd } from "./components/ng2-completer/completer-cmp-md";
// import { CompleterListItemCmp } from "./components/ng2-completer/completer-list-item-cmp";
// import { CompleterService } from "./components/ng2-completer/services/completer-service";
// import { LocalDataFactoryProvider, RemoteDataFactoryProvider } from "./components/ng2-completer/services/completer-data-factory";
// import { CtrCompleter } from "./directives/ctr-completer";
// import { CtrDropdown } from "./directives/ctr-dropdown";
// import { CtrInput } from "./directives/ctr-input";
// import { CtrList } from "./directives/ctr-list";
// import { CtrRow } from "./directives/ctr-row";
import { Ng2CompleterModule } from "./ng2-completer.module";



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        Ng2CompleterModule
    ],
    declarations: [
        CompleterCmpMd
    ],
    exports: [
        CompleterCmpMd
    ]
})
export class Ng2CompleterMdModule {}
