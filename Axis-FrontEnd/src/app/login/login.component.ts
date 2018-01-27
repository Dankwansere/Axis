import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import{FormGroup, FormControl} from '@angular/forms';
import {User} from '../model/user';
import {ParseJsonObject} from '../utilities/parseJsonObject';


@Component ({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['logReg.component.css']
})

export class LoginComponent{

    _user: User;
    isLoading: boolean = false;
    loginForm = new FormGroup ({
        userName: new FormControl(),
        passWord: new FormControl()
    });

    isUserLoggedIn: boolean;

    constructor(private _loginService:LoginService){}

    public login(){
        this.isLoading = true;
        this._loginService.loginPostRequest(this.loginForm.value)
          .subscribe(data => {
            this.verifyResponse(data)
            this.isLoading = false;
        });
    }

    public verifyResponse(data){
        this._user = ParseJsonObject.convertJsonToUserObject(JSON.parse(data._body));
        if(this._user != null){
            this._user.setLoggedIn(true);
        }
    }

    ngOnInit(){
        this.isUserLoggedIn = this._loginService.isLoggedIn;
    }
}