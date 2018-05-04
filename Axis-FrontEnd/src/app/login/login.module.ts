import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {LoginComponent} from './login.component';
import {LoginService} from '../services/login.service';
import {LogRegComponent} from './logReg.component';
import {RegisterComponent} from './register.component';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BaseApiService } from '../services/baseApi.service';



@NgModule ({
    declarations: [LoginComponent, LogRegComponent, RegisterComponent],
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, HttpClientModule],
    exports: [],
    providers: [LoginService, BaseApiService]
})

export class LoginModule {
}
