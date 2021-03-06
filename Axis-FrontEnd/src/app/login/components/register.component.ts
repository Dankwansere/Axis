import {Component, OnInit, Input, Inject} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {LoginService} from '@services/login.service';
import {CanComponentDeactivate} from '../../guards/deactivate-guard.service';
import {BaseCommon, Constant} from '../../commons/baseCommon'
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component ({
    selector : 'register',
    templateUrl : '../view/register.component.html',
    styleUrls: ['../view/logReg.component.css']
})

export class RegisterComponent extends BaseCommon implements CanComponentDeactivate {

    private readonly successMessage: string = 'User has been succesfully added to the system';
    private readonly errorMessage: string = 'Could not add user to system';
    private isUsernameValid: boolean;
    private displayIcon: boolean;
    private isLoading: boolean = false;
    private isUserCreated: string; // String instead of boolean to prevent a logic error in the component template
    private isFormSubmitted: boolean
    private checkMarkIconPath: string = require('../../../app/assets/icons/checkmark.png');
    private xMarkIconPath: string = require('../../../app/assets/icons/xmark.png');
    imageUrl: string;

   @Input() userForm = new FormGroup ({
        userName: new FormControl(null, Validators.required),
        firstName: new FormControl(),
        lastName: new FormControl(),
        emailAdd: new FormControl(),
        passWord: new FormControl(),
        gender: new FormControl(),
        confirmPassword: new FormControl()
    });

    constructor(private loginService: LoginService,
         @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<RegisterComponent>) {
        super();
    }


    public register() {
        this.isLoading = true;

        try {
            const userFormJson = JSON.stringify(this.userForm.value);

            this.loginService.registerPostRequest(userFormJson)
            .subscribe(data => {
                this.isLoading = false;
                this.confirmUserCreation(data);
            });
            this.userForm.disabled;
        } catch (ex) {
            this.isLoading = false;
        }
    }

    private confirmUserCreation(data) {

        if (data.success === true) {
            this.isFormSubmitted = true;
            this.isUserCreated = 'success';
            this.dialogRef.close();
        } else {
            this.isFormSubmitted = false;
            this.isUserCreated = 'error';
        }
    }

    // JSON returned {"success", boolean}
    private validateUsername(data) {
        this.displayIcon = true;

        if (data.success === true) {
            this.imageUrl = this.xMarkIconPath;
        } else if (data.success === false) {
            this.imageUrl = this.checkMarkIconPath;
        }
    }

    private resetUsernameIcon() {
        this.displayIcon = false;
        this.imageUrl = '';
    }

    ngOnInit() {

        this.isUserCreated = 'new form';
        this.userForm.controls['userName'].valueChanges
            .debounceTime(300)
            .distinctUntilChanged()
            .filter(text => {
               if (text.length >= Constant.FOUR) {
                return true;
               } else {
                   this.resetUsernameIcon();
                   return false;
               }})
            .subscribe(data => {
                this.loginService.validateUserNameGetRequest(this.userForm.controls['userName'].value)
                .subscribe(data => {
                    this.validateUsername(data)})
                });
    }

    canDeactivate() {
        if (this.userForm.dirty && !this.isFormSubmitted) {
            return confirm('Changes not saved! \nAre you sure you want to leave?');
        } else {
            return true;
        }
    }
}

