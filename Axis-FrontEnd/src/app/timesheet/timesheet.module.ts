import {NgModule} from '@angular/core';
import {Timesheet} from './timesheet.component';
import { BrowserModule } from '@angular/platform-browser';
import {TimeSheetService} from '../services/timesheet.service';
import {TimesheetResolver} from '../services/timesheetResolver.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
    declarations: [Timesheet],
    imports:  [BrowserModule, FormsModule, ReactiveFormsModule],
    exports: [],
    providers: [TimeSheetService, TimesheetResolver]
   
})

export class TimesheetModule {

}