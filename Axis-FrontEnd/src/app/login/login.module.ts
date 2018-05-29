import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {LoginComponent} from '@login/components/login.component';
import {LoginService} from '../services/login.service';
import {LogRegComponent} from '@login/components/logReg.component';
import {RegisterComponent} from '@login/components/register.component';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BaseApiService } from '../services/baseApi.service';

import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

@NgModule ({
    declarations: [LoginComponent, LogRegComponent, RegisterComponent],
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule,
         HttpClientModule, MatInputModule, MatIconModule],
    exports: [],
    providers: [LoginService, BaseApiService]
})

export class LoginModule {
}
