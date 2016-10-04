import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { NativeCmp } from "./native-cmp";

const appRoutes: Routes = [
    {
        path: "",
        redirectTo: "native",
        pathMatch: "full"
    },
    {
        path: "native",
        component: NativeCmp
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
