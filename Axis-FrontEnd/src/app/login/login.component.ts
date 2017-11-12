import {Component} from '@angular/core';
import {LoginService} from './login.service';

@Component ({
    selector: 'login',
    templateUrl: 'login.component.html'
})

export class LoginComponent{

    username;
    password;
    constructor(private _loginService:LoginService){

    }

    public login(userName){
        console.log("Username: " + this.username + " Password: " + this.password);
        //this._loginService.Login
    }

}