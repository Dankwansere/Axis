import {NgModule} from '@angular/core';
import {TimesheetComponent} from './timesheet.component';
import {TimeSheetService} from '../services/timesheet.service';
import {TimesheetResolver} from '../services/timesheetResolver.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TimesheetRouting} from './timesheet.routing'

import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [TimesheetComponent],
    imports:  [CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule, TimesheetRouting],
    exports: [],
    providers: [TimeSheetService, TimesheetResolver]

})

export class TimesheetModule {

}
