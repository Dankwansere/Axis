import {Routes, RouterModule} from '@angular/router';

import {PayrollComponent} from './payroll/payroll.component';
import {CareerComponent} from './career/career.component';
import {ProfileComponent} from './profile/profile.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home.component'

import {AuthGuard} from './auth-guard.service'

export const routing = RouterModule.forRoot([
    {path: '', component: HomeComponent},
    {path: 'payroll', component: PayrollComponent, canActivate:[AuthGuard]},
    {path: 'career', component: CareerComponent},
    {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
    {path: 'login', component: LoginComponent}

])