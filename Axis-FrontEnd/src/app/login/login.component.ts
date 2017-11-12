import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';

@Component ({
    selector: 'login',
    templateUrl: 'login.component.html'
})

export class LoginComponent{

    username;
    password;
    isUserLoggedIn : boolean;
    constructor(private _loginService:LoginService){
        
    }

    public login(){
        this.isUserLoggedIn = this._loginService.Login(this.username, this.password);
    
    }

    ngOnInit(){
        this.isUserLoggedIn = this._loginService.isLoggedIn;
    }

}