import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { Authentication } from '../commons/authentication';
import { User } from '../model/user';


@Component({
    selector: 'timeSheet',
    templateUrl: 'timesheet.component.html'
})

export class Timesheet implements OnInit {
    TimesheetUser: User;
    FullName: String;
    YearList: String [] = new Array(5); 
    today = new Date() ;

    
    
    
    
    public ngOnInit() {
        this.TimesheetUser = Authentication.retrieveSessionUserObject();
        this.FullName = this.TimesheetUser.firstName + " " + this.TimesheetUser.lastName;
        this.YearList[0] = this.today.getFullYear().toString();
        console.log(this.today.getDay() - 2);
        console.log("YEAR 0: ", this.YearList[0] );

    }
}