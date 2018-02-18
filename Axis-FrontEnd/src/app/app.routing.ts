import {Routes, RouterModule} from '@angular/router';

import {PayrollComponent} from './payroll/payroll.component';
import {CareerComponent} from './career/career.component';
import {ProfileComponent} from './profile/profile.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {LogRegComponent} from './login/logReg.component';
import {RegisterComponent} from './login/register.component';
import {Timesheet} from './timesheet/timesheet.component';


import {AuthGuard} from './auth-guard.service';

export const routing = RouterModule.forRoot([
    {path: '', component: HomeComponent},
    {path: 'payroll', component: PayrollComponent, canActivate:[AuthGuard]},
    {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
    {path: 'timesheet', component: Timesheet, canActivate:[AuthGuard]},
    {path: 'career', component: CareerComponent},
    {path: 'addNewUser', component: RegisterComponent},
    {path: 'logReg', component: LogRegComponent,
        children: [
        {path: 'login', component: LoginComponent},
        {path: 'signup', component: RegisterComponent}

    ]
}
]);
