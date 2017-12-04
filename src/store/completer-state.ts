import { TemplateRef } from '@angular/core';

export type CompleterState = Readonly<{
    focus: boolean;
    open: boolean;
    templateRef: TemplateRef<any> | null;
}>;

export const CTR_INITIAL_STATE: CompleterState = Object.freeze({
    focus: false,
    open: false,
    templateRef: null
});
