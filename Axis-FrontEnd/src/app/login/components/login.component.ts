import {Component, OnInit, Inject} from '@angular/core';
import {LoginService} from '@services/login.service';
import {FormGroup, FormControl} from '@angular/forms';
import {User} from '../../model/user';
import {Authentication} from '../../commons/authentication';
import {JsonConvert} from 'json2typescript';
import { Router } from '@angular/router';

import {MAT_DIALOG_DATA, MatDialogRef, MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';


@Component ({
    selector: 'login',
    templateUrl: '../view/login.component.html',
    styleUrls: ['../view/logReg.component.css']
})

export class LoginComponent implements OnInit {

    user: User;
    isLoading: boolean = false;
    loginForm = new FormGroup ({
        userName: new FormControl(),
        passWord: new FormControl()
    });


    displayLoginErrorMsg: boolean;
    isUserLoggedIn: boolean;
    userLoginErrorMessage: string;

    // private passwdIcon: string = require('../../app/assets/icons/passwd.png');

    constructor(private _loginService: LoginService, private router: Router,
         @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<LoginComponent>,
          sanitizer: DomSanitizer) {
            // iconRegistry.addSvgIcon(
            //     'thumbs-up',
            //     sanitizer.bypassSecurityTrustResourceUrl('../../app/assets/icons/passwd.svg'));
         }

    public login() {
        this.isLoading = true;
        this._loginService.loginPostRequest(this.loginForm.value)
          .subscribe(data => {
            this.verifyResponse(data);
            this.isLoading = false;
            if (this.isUserLoggedIn) {
                this.dialogRef.close();
                this.router.navigate(['']);
            }
        });
    }

    public verifyResponse(data) {
        const jsonConvert: JsonConvert = new JsonConvert();

        const authToken = data.headers.get('Authorization');


        try {
            this.user = jsonConvert.deserialize(data.body, User);
        } catch (err) {
            console.log('Error parsing json to user: ' + err);
        }

        if (this.user != null) {
            this.user.isLoggedIn = true;

            if (authToken !== null || authToken !== undefined) {
                this.user.token = authToken;
            }

            Authentication.setUserInSession(this.user);
            this.isUserLoggedIn = this.user.isLoggedIn;
            this.displayLoginErrorMsg = false;
        } else {
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
