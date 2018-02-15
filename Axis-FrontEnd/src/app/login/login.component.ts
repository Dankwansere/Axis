import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {FormGroup, FormControl} from '@angular/forms';
import {User} from '../model/user';
import {CommonParser} from '../utilities/commonParser';
import {Authentication} from '../commons/authentication';


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

    isUserLoggedIn: boolean;

    constructor(private _loginService: LoginService) {}

    public login() {
        this.isLoading = true;
        this._loginService.loginPostRequest(this.loginForm.value)
          .subscribe(data => {
            this.verifyResponse(data);
            this.isLoading = false;
        });
    }

    public verifyResponse(data) {
        this._user = CommonParser.parseJsonToUserObject(data);
        if (this._user != null) {
            this._user.isLoggedIn = true;
            Authentication.setUserInSession(this._user);
            this.isUserLoggedIn = this._user.isLoggedIn;
        }
    }

    ngOnInit() {
        if (Authentication.isUserSessionActive()) {
            this.isUserLoggedIn = true;
        }
    }
}
