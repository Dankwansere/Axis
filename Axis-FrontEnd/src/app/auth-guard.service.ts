import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import { LoginService } from 'app/login/login.service';
import { Authentication } from 'app/commons/authentication';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _loginService: LoginService){

    }

    canActivate() {
        // pull user from session or local storage
        if (Authentication.isUserSessionActive()) {
            return true;
        } else {
            return false;
        }
    }
}
