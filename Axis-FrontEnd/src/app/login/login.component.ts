import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import{FormGroup, FormControl} from '@angular/forms';

@Component ({
    selector: 'login',
    templateUrl: 'login.component.html'
})

export class LoginComponent{

    loginForm = new FormGroup ({
        userName: new FormControl(),
        passWord: new FormControl()
    });

    isUserLoggedIn : boolean;

    constructor(private _loginService:LoginService){
        
    }

    public login(){
       this._loginService.loginPostRequest(this.loginForm.value).subscribe(data => console.log(data));
        this.isUserLoggedIn = true;
    }

    ngOnInit(){
        this.isUserLoggedIn = this._loginService.isLoggedIn;
    }

}