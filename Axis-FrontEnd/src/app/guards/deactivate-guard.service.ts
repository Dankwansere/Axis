import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

export interface CanComponentDeactivate {
    canDeactivate: () => boolean;
}

export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

    canDeactivate(component: CanComponentDeactivate, currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
     nextState?: RouterStateSnapshot): boolean {
        return component.canDeactivate();
    }
}