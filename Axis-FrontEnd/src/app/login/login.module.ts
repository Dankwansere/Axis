import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {LoginComponent} from './login.component';
import{LoginService} from './login.service'


@NgModule ({
    declarations: [LoginComponent],
    imports: [CommonModule, RouterModule, FormsModule],
    exports:[],
    providers: [LoginService]
})

export class LoginModule{

}