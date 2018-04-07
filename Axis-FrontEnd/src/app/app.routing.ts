import {Routes, RouterModule} from '@angular/router';

import {PayrollComponent} from './payroll/payroll.component';
import {CareerComponent} from './career/career.component';
import {ProfileComponent} from './profile/profile.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {LogRegComponent} from './login/logReg.component';
import {RegisterComponent} from './login/register.component';
import {Timesheet} from './timesheet/timesheet.component';
import {CanDeactivateGuard} from './deactivate-guard.service'


import {AuthGuard} from './auth-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TimesheetResolver } from './services/timesheetResolver.service';

export const routing = RouterModule.forRoot([
    {path: '', component: HomeComponent},
    {path: 'payroll', component: PayrollComponent, canActivate:[AuthGuard]},
    {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
    {path: 'timesheet', component: Timesheet, canActivate:[AuthGuard], resolve: {timesheetResolver: TimesheetResolver}},
    {path: 'career', component: CareerComponent},
    {path: 'addNewUser', component: RegisterComponent, canDeactivate:[CanDeactivateGuard]},
    {path: 'logReg', component: LogRegComponent,
        children: [
        {path: 'login', component: LoginComponent},
        {path: 'signup', component: RegisterComponent}]
    },
    {path: 'not-found', component: PageNotFoundComponent},
    {path: '**', redirectTo: '/not-found'}   
]);
