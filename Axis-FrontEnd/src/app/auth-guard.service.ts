import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import { LoginService } from 'app/login/login.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _loginService:LoginService){

    } 

    canActivate(){

        if(this._loginService.isLoggedIn) {
            return true;
        }
        else {
            return false;
        } 
    }
}