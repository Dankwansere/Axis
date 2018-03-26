import {Component, OnInit} from '@angular/core';
import {LoginService} from '../services/login.service';
import {FormGroup, FormControl} from '@angular/forms';
import {User} from '../model/user';
import {Authentication} from '../commons/authentication';
import {JsonConvert} from 'json2typescript';
import { Router } from '@angular/router';


@Component ({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['logReg.component.css']
})

export class LoginComponent implements OnInit {

    _user: User;
    isLoading: boolean = false;
    loginForm = new FormGroup ({
        userName: new FormControl(),
        passWord: new FormControl()
    });

    displayLoginErrorMsg: boolean;
    isUserLoggedIn: boolean;
    userLoginErrorMessage: string;

    constructor(private _loginService: LoginService, private router: Router) {}

    public login() {
        this.isLoading = true;
        this._loginService.loginPostRequest(this.loginForm.value)
          .subscribe(data => {
            this.verifyResponse(data);
            this.isLoading = false;
            if(this.isUserLoggedIn) {
                this.router.navigate(['']);
            }
        });
       
        
    }

    public verifyResponse(data) {
        
        const jsonConvert: JsonConvert = new JsonConvert();
        try {
            this._user = jsonConvert.deserialize(data, User);
        } catch (err) {
            console.log('Error parsing json to user: ' + err);
        }

        if (this._user != null) {
            this._user.isLoggedIn = true;
            Authentication.setUserInSession(this._user);
            this.isUserLoggedIn = this._user.isLoggedIn;
            this.displayLoginErrorMsg = false;
        }
        else {
            this.displayLoginErrorMsg = true;
            this.userLoginErrorMessage = 'Invalid Username or Password'
        }
    }

    ngOnInit() {
        if (Authentication.isUserSessionActive()) {
            this.isUserLoggedIn = true;
        }
    }
}
