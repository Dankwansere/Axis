import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {LoginService} from './login.service';

@Component ({
    selector : 'register',
    templateUrl : 'register.component.html'
})

export class RegisterComponent {

    
    userForm = new FormGroup ({
        userName: new FormControl(),
        firstName: new FormControl(),
        lastName: new FormControl(),
        emailAdd: new FormControl(),
        passWord: new FormControl(),
        gender: new FormControl(),
        confirmPassword: new FormControl(),
        //file: new FormControl()
    });

    constructor(private loginService : LoginService){

    }


    public register() {

        console.log(this.userForm.value);
        /*console.log(this.userForm.controls["firstName"].value);
        console.log(this.userForm.controls["lastName"].value);
        console.log(this.userForm.controls["emailAdd"].value);
        console.log(this.userForm.controls["passWord"].value);
        console.log(this.userForm.controls["gender"].value); */
        let userFormJson = JSON.stringify(this.userForm.value);

        this.loginService.registerPostRequest(userFormJson).subscribe();

    }
    
}

