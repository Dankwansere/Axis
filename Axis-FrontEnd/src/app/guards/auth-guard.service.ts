import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import { LoginService } from '../services/login.service';
import { Authentication } from 'app/commons/authentication';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _loginService: LoginService, private route: Router){

    }

    canActivate() {
        // pull user from session or local storage
        if (Authentication.isUserSessionActive()) {
            return true;
        } else {
            this.route.navigate(['/logReg']);
            return false;
        }
    }
}
