import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {LoginComponent} from './login.component';
import {LoginService} from './login.service';
import {LogRegComponent} from './logReg.component';
import {RegisterComponent} from './register.component';

import {ReactiveFormsModule} from '@angular/forms';



@NgModule ({
    declarations: [LoginComponent, LogRegComponent, RegisterComponent],
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
    exports:[],
    providers: [LoginService]
})

export class LoginModule{

}