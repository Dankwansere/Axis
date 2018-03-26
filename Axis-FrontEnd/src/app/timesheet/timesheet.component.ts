import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormArray} from '@angular/forms';
import { Authentication } from '../commons/authentication';
import { User } from '../model/user';
import {TimeSheetService} from '../services/timesheet.service';
import {ActivatedRoute} from '@angular/router'


@Component({
    selector: 'timeSheet',
    templateUrl: 'timesheet.component.html'
})

export class Timesheet implements OnInit {
   
    tuesday = new FormControl();

    
    TimesheetUser: User;
    rowCounter: number = 0;
    readonly fullWeeek: number = 7;
    entryRows: number[] = new Array(1);
    timesheetWeek: string [] = new Array(5);
    weekdaysTest: string[] = new Array(5);
    dateArray: Date [] = new Array(5); 
    projectList: string[] = new Array();
    tableColumnHeading = ['Project', 'Activity', 'Category'];
    readonly weekdays = ['Sun ', 'Mon ', 'Tue ', 'Wed ', 'Thu ', 'Fri ', 'Sat '];
    today = new Date();
    weekDayNumber: number;
    
    
    constructor(private timesheetService: TimeSheetService, private route: ActivatedRoute){}

    public ngOnInit() {
        this.TimesheetUser = Authentication.retrieveSessionUserObject();
        this.validWeeklyPeriods()
        this.projectListRetrieval(); //test
        this.weekDisplay(0);
    }

    private validWeeklyPeriods() {
        let i: number;
        this.weekDayNumber = this.today.getDay();
        let tempDate: number;
        let dateOfWeek: Date;
     
        if(this.weekDayNumber == 7) {
            dateOfWeek = new Date();
            tempDate = this.today.getDate();
            dateOfWeek.setDate(tempDate);
        }
        else {
            dateOfWeek = new Date();
            tempDate = this.today.getDate() - this.weekDayNumber;
            dateOfWeek.setDate(tempDate);
        }
        this.timesheetWeek[0] = dateOfWeek.toDateString();
        this.dateArray[0] = dateOfWeek;

        for( i = 1; i < 5; i++ ) {
            let tempCurrentDate = new Date();
            tempDate = this.today.getDate() - this.weekDayNumber - (this.fullWeeek * i);
            tempCurrentDate.setDate(tempDate);
            this.timesheetWeek[i] = tempCurrentDate.toDateString();
            this.dateArray[i] = tempCurrentDate;
        }
       
    }

    private projectListRetrieval() { //test
       
       let data = this.route.snapshot.data['timesheetResolver'];
       let i: number; 

       for(i = 0; i < 7; i++) {
        this.projectList[i] = data[i].genericName;
        }     
    }

    private weekDisplay(dayOfWeekNumber) {
        let month = this.dateArray[dayOfWeekNumber].getMonth() + 1;
        let day = this.dateArray[dayOfWeekNumber].getDate();

         for(let i =0; i < 7; i++ ){
             this.weekdaysTest[i] = month + "-" + day;
             day = day + 1;
         }
    }
    private addNewRow(){
        const control = new FormControl("test");
        this.entryRows.push(this.rowCounter++);
        //(<FormArray>this.timesheetForm.get("project")).push(control);
    }

    private removeRow(){
        this.entryRows.pop();
    }

    private timesheetPrepare(){
        //console.log("value1: ", this.timesheetForm.get("project").value);
        console.log("value2: ", this.tuesday.value);
    }
}