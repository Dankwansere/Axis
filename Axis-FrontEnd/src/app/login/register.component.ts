import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {LoginService} from './login.service';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component ({
    selector : 'register',
    templateUrl : 'register.component.html'
})

export class RegisterComponent {

    isUsernameValid: boolean;
    displayIcon: boolean;

    private checkMarkIconPath:string = "./app/assets/icons/checkmark.png";
    private xMarkIconPath:string = "./app/assets/icons/xmark.png";
    imageUrl:string;
    
   @Input() userForm = new FormGroup ({
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
       
        let userFormJson = JSON.stringify(this.userForm.value);

        this.loginService.registerPostRequest(userFormJson).subscribe(data => console.log(data));

    }

    private validateUsername(value){
        this.displayIcon = true;

        if(value._body == "true"){
            this.imageUrl = this.xMarkIconPath;
        }
        else if(value._body == "false"){
            this.imageUrl = this.checkMarkIconPath;
        }
    }

    private resetUsernameIcon(data) : any{
        if(data.length == 0){
            this.displayIcon = false;
            this.imageUrl = "";
        }
    }

    ngOnInit(){

        this.userForm.controls["userName"].valueChanges.filter(text => this.resetUsernameIcon(text)).subscribe();

        this.userForm.controls["userName"].valueChanges
        .filter(text => text.length >= 4)
        .debounceTime(400)
        .distinctUntilChanged()
        .subscribe(data => this.loginService
            .validateUserNameGetRequest(this.userForm.controls["userName"].value)
            .subscribe(value => this.validateUsername(value)));
    }
    
}

