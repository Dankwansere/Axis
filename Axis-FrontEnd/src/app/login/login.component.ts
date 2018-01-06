import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import{FormGroup, FormControl} from '@angular/forms';


@Component ({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['logReg.component.css']
})

export class LoginComponent{

    isLoading:boolean = false;
   
    loginForm = new FormGroup ({
        userName: new FormControl(),
        passWord: new FormControl()
    });

    isUserLoggedIn : boolean;

    constructor(private _loginService:LoginService){
        
    }

    public login(){
        this.isLoading = true;
        this._loginService.loginPostRequest(this.loginForm.value)
          .subscribe(data => {
            this.verifyResponse(data)
            this.isLoading = false;
        });
    }

    public verifyResponse(data){
        let loginResponse:string = data._body;

        if(loginResponse == "true") {
            this._loginService.isLoggedIn = true;
            this.isUserLoggedIn = this._loginService.isLoggedIn;
            
        }
        else {
            this.isUserLoggedIn = false;
        }
        
        console.log("from response: " + this.isUserLoggedIn);
    }

    ngOnInit(){
        this.isUserLoggedIn = this._loginService.isLoggedIn;
    }
}