import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MaterialCmp } from "./material-cmp";
import { NativeCmp } from "./native-cmp";

const appRoutes: Routes = [
    {
        path: "",
        redirectTo: "/native",
        pathMatch: "full"
    },
    {
        path: "native",
        component: NativeCmp
    },
    {
        path: "material",
        component: MaterialCmp
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {useHash: true});
