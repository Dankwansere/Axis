import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimesheetComponent } from './timesheet.component';
import {AuthGuard} from '../guards/auth-guard.service';
import { TimesheetResolver } from '../services/timesheetResolver.service';


const routes: Routes = [
    {path: '',
    component: TimesheetComponent, canActivate: [AuthGuard], resolve: {timesheetResolver: TimesheetResolver}
   }
];

export const TimesheetRouting: ModuleWithProviders = RouterModule.forChild(routes);
