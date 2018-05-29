import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimesheetComponent } from '@timesheet/components/timesheet.component';
import {AuthGuard} from '../guards/auth-guard.service';
import {CanDeactivateGuard} from '../guards/deactivate-guard.service';
import { TimesheetResolver } from '@services/timesheetResolver.service';


const routes: Routes = [
    {path: '',
    component: TimesheetComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard],
     resolve: {timesheetResolver: TimesheetResolver}
   }
];

export const TimesheetRouting: ModuleWithProviders = RouterModule.forChild(routes);
