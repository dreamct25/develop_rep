import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";

@Injectable()
export class Resovles implements Resolve<void> {
    constructor(private router: Router) { }
    resolve(route: ActivatedRouteSnapshot): void {
        this.router.navigate(["/main"])
    }
}
