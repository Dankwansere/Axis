import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {LoginService} from './login.service';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component ({
    selector : 'register',
    templateUrl : 'register.component.html',
    styleUrls: ['logReg.component.css']
})

export class RegisterComponent {

    private readonly successMessage: string = 'User has been succesfully added to the system';
    private readonly errorMessage: string = 'Could not add user to system';
    private isUsernameValid: boolean;
    private displayIcon: boolean;
    private isLoading:boolean = false;
    private isUserCreated:string;
    private checkMarkIconPath:string = require("../../app/assets/icons/checkmark.png");
    private xMarkIconPath:string = require("../../app/assets/icons/xmark.png");
    imageUrl:string;
    
   @Input() userForm = new FormGroup ({
        userName: new FormControl(),
        firstName: new FormControl(),
        lastName: new FormControl(),
        emailAdd: new FormControl(),
        passWord: new FormControl(),
        gender: new FormControl(),
        confirmPassword: new FormControl()
    });

    constructor(private loginService : LoginService){
        
    }


    public register() {

        this.isLoading = true;
        console.log(this.userForm.value);
       
        let userFormJson = JSON.stringify(this.userForm.value);

        this.loginService.registerPostRequest(userFormJson)
        .subscribe(data => {
            this.isLoading = false;
            console.log(data)
            this.confirmUserCreation(data);
        });
    }

    private confirmUserCreation(data){
    
        if(data.success == true){
            this.isUserCreated = 'success';
        }
        else {
            this.isUserCreated = 'error';
        }
    }

    //JSON returned {"success", boolean}
    private validateUsername(data){
        this.displayIcon = true;
       
        if(data.success == true){
            this.imageUrl = this.xMarkIconPath;
        }
        else if(data.success == false){
            this.imageUrl = this.checkMarkIconPath;
        }
        
    }

    private resetUsernameIcon(){
        this.displayIcon = false;
        this.imageUrl = "";
    }

    ngOnInit(){

        this.isUserCreated = 'new form';
      
        this.userForm.controls["userName"].valueChanges
            .debounceTime(300)
            .distinctUntilChanged()
            .filter(text => {
               if(text.length >= 4) {
                return true;
               } else {
                   this.resetUsernameIcon();
                   return false;
               }})
            .subscribe(data => {
                this.loginService.validateUserNameGetRequest(this.userForm.controls["userName"].value)
                .subscribe(data => {
                    this.validateUsername(data)})
                });
    }
    
}

