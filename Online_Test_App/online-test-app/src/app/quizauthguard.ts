import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class QuizAuthGuard implements CanActivate {
    constructor(public router: Router) { }

    canActivate() {
        let obj = sessionStorage.getItem("quiz");
        if (obj != null) {
            return true;
        } else {
            this.router.navigate(["home"]);
            return false;
        }
    }
}