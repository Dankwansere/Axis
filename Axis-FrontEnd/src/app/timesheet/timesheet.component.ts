import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormArray, FormBuilder} from '@angular/forms';
import {Authentication} from '../commons/authentication';
import {User} from '../model/user';
import {TimeSheetService} from '../services/timesheet.service';
import {ActivatedRoute} from '@angular/router';
import {BaseCommon, Constant} from '../commons/baseCommon'


@Component({
    selector: 'timeSheet',
    templateUrl: 'timesheet.component.html'
})

export class Timesheet extends BaseCommon implements OnInit {
    
    selectedWeek: String;
    items: any[] = [];
    timesheetForm: FormGroup;
    timesheetUser: User;
    readonly fullWeeek: number = Constant.SEVEN;
    timesheetWeek: string [] = new Array(Constant.FIVE);
    weekdayDisplay: string[] = new Array(Constant.FIVE);
    dateArray: Date [] = new Array(Constant.FIVE); 
    projectList: string[] = new Array();
    tableColumnHeading = ['Project', 'Activity', 'Category'];
    readonly weekdays = ['Sun ', 'Mon ', 'Tue ', 'Wed ', 'Thu ', 'Fri ', 'Sat '];
    today = new Date();
    weekDayNumber: number;
    
    
    constructor(private timesheetService: TimeSheetService, private route: ActivatedRoute, private fb: FormBuilder){
        super();
    }

    public ngOnInit() {

        this.validWeeklyPeriods();

        this.timesheetForm = this.fb.group({
            items: this.fb.array([this.createItem()])
        });

        this.timesheetUser = Authentication.retrieveSessionUserObject();
        this.validWeeklyPeriods();
        this.projectListRetrieval(); 
        this.weekDisplay(Constant.ZERO);
    }

    private validWeeklyPeriods() {
        let i: number;
        this.weekDayNumber = this.today.getDay();
        let tempDate: number;
        let dateOfWeek: Date;
     
        if(this.weekDayNumber == Constant.SEVEN) {
            dateOfWeek = new Date();
            tempDate = this.today.getDate();
            dateOfWeek.setDate(tempDate);
        }
        else {
            dateOfWeek = new Date();
            tempDate = this.today.getDate() - this.weekDayNumber;
            dateOfWeek.setDate(tempDate);
        }
        this.timesheetWeek[Constant.ZERO] = dateOfWeek.toDateString();
        this.selectedWeek = dateOfWeek.toDateString();
        this.dateArray[Constant.ZERO] = dateOfWeek;

        for( i = 1; i < Constant.FIVE; i++ ) {
            let tempCurrentDate = new Date();
            tempDate = this.today.getDate() - this.weekDayNumber - (this.fullWeeek * i);
            tempCurrentDate.setDate(tempDate);
            this.timesheetWeek[i] = tempCurrentDate.toDateString();
            this.dateArray[i] = tempCurrentDate;
        }
       
    }

    private projectListRetrieval() { 
       
       let data = this.route.snapshot.data['timesheetResolver'];
       let i: number; 

       for(i = 0; i < Constant.SEVEN; i++) {
        this.projectList[i] = data[i].genericName;
        }     
    }

    // Parameter dayOfWeekNumber
    // dayOfWeekNumber will be the index of the selected week
    // this index will pull the coresponding date from the dateArray
    // and also display the corresponding days of the week dynamically
    private weekDisplay(dayOfWeekNumber) {
        let month = this.dateArray[dayOfWeekNumber].getMonth() + 1;
        let day = this.dateArray[dayOfWeekNumber].getDate();
        this.selectedWeek = this.dateArray[dayOfWeekNumber].toDateString();

         for(let i = 0; i < Constant.SEVEN; i++ ){
             this.weekdayDisplay[i] = month + "-" + day;
             day = day + 1;
         }
    }


    private createItem(): FormGroup {
        return this.fb.group({
            Week: this.selectedWeek,
            Project: '', Activity: '',
            Category: '', DaySun: '',
            DayMon: '', DayTue: '',
            DayWed: '', DayThu: '',
            DayFri: '', DaySat: '',
            Total: ''
        });
    }


    private addNewRow(): void{
        this.items =  this.timesheetForm.get('items') as any;
        this.items.push(this.createItem());
    }

    private removeRow() {
        let arrLength = (<FormArray>this.timesheetForm.get('items')).length;
        (<FormArray>this.timesheetForm.get('items')).removeAt(arrLength - 1);
    }

    private timesheetPrepareAndSubmit() {
       this.timesheetService.submitTimesheet(this.timesheetForm.get('items').value);
    }
}