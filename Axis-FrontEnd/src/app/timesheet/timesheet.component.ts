import {Component, OnInit, Renderer2} from '@angular/core';
import {FormGroup, FormControl, FormArray, FormBuilder} from '@angular/forms';
import {Authentication} from '../commons/authentication';
import {User} from '../model/user';
import {TimeSheetService} from '../services/timesheet.service';
import {ActivatedRoute} from '@angular/router';
import {BaseCommon, Constant} from '../commons/baseCommon'


@Component({
    selector: 'timeSheet',
    templateUrl: 'timesheet.component.html',
    styleUrls: ['timesheet.component.css']
})



export class Timesheet extends BaseCommon implements OnInit {
    
    selectedWeek = new Date()
    totalDisplay = new Array(1);;
    items: any[] = [];
    timesheetForm: FormGroup;
    user: User;
    readonly fullWeeek: number = Constant.SEVEN;
    timesheetWeek: string [] = new Array(Constant.FIVE);
    weekdayDisplay: string[] = new Array(Constant.FIVE);
    dateArray: Date [] = new Array(Constant.FIVE); 
    projectList: string[] = new Array();
    tableColumnHeading = ['Project', 'Activity', 'Category'];
    readonly weekdays = [WeekDay.SUNDAY, WeekDay.MONDAY, WeekDay.TUESDAY,
         WeekDay.WEDNESDAY , WeekDay.THURSDAY, WeekDay.FRIDAY, WeekDay.SATURDAY];
    today = new Date();
    weekDayNumber: number;

        
    constructor(private renderer:Renderer2, private timesheetService: TimeSheetService, private route: ActivatedRoute, private fb: FormBuilder){
        super();
        
    }

    public ngOnInit() {

        this.validWeeklyPeriods();
        this.user = Authentication.retrieveSessionUserObject();
        this.timesheetForm = this.fb.group({
            items: this.fb.array([this.createItem()])
        });

        this.projectListRetrieval(); 
        this.weekDisplay(Constant.ZERO);

    }

    private validWeeklyPeriods(): void {
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
        this.selectedWeek = dateOfWeek;//dateOfWeek.toDateString();
        this.dateArray[Constant.ZERO] = dateOfWeek;

        for( i = Constant.ONE; i < Constant.FIVE; i++ ) {
            let tempCurrentDate = new Date();
            tempDate = this.today.getDate() - this.weekDayNumber - (this.fullWeeek * i);
            tempCurrentDate.setDate(tempDate);
            this.timesheetWeek[i] = tempCurrentDate.toDateString();
            this.dateArray[i] = tempCurrentDate;
        }
       
    }

    private projectListRetrieval(): void { 
       let data = this.route.snapshot.data['timesheetResolver'];
       let i: number; 

       for(i = Constant.ZERO; i < Constant.SEVEN; i++) {
            this.projectList[i] = data[i].genericName;
        }     
    }

    // Parameter: dayOfWeekNumber
    // dayOfWeekNumber will be the index of the selected week
    // this index will pull the coresponding date from the dateArray
    // and also display the corresponding days of the week dynamically
    private weekDisplay(dayOfWeekNumber): void {
        let month = this.dateArray[dayOfWeekNumber].getMonth() + Constant.ONE;
        let day = this.dateArray[dayOfWeekNumber].getDate();
        let tempDate = this.dateArray[dayOfWeekNumber].toDateString();
        tempDate = tempDate.substr(0,3) + ', ' + tempDate.substr(4)
        this.selectedWeek = this.dateArray[dayOfWeekNumber];//tempDate; 
        this.updateFormGroupControlValue();

         for(let i = Constant.ZERO; i < Constant.SEVEN; i++ ){
             this.weekdayDisplay[i] = month + "-" + day;
             day = day + Constant.ONE;
         }

    }


    private updateFormGroupControlValue(): void {
        let arrWeek = (<FormArray>this.timesheetForm.get('items')).controls;
        for(let arr of arrWeek){
            arr.patchValue({week: this.selectedWeek})
        } 
    }


    private createItem(): FormGroup {
        return this.fb.group({
            week: this.selectedWeek,
            project: '', activity: '',
            category: this.user.role,
            daySun: '', dayMon: '', dayTue: '',
            dayWed: '', dayThu: '',
            dayFri: '', daySat: '',
            total: Constant.ZERO,
            status: '',
            username: this.user.userName
        });
    }


    private addNewRow(): void{
        this.items =  this.timesheetForm.get('items') as any;
        this.items.push(this.createItem());

        this.totalDisplay.length++;
    }

    private removeRow(): void {
        let arrLength = (<FormArray>this.timesheetForm.get('items')).length;
        (<FormArray>this.timesheetForm.get('items')).removeAt(arrLength - 1);

        this.totalDisplay.length--;
    }

    private timesheetPrepareAndSubmit(): void {
        this.preSubmit();     

        //console.log(this.timesheetForm.get('items').value);

        
       this.timesheetService.submitTimesheet(this.timesheetForm.get('items').value)
       .subscribe(data => console.log(data)); 
    }

    private preSubmit(): void {
        let tempTimesheet = this.timesheetForm.get('items').value;
        for(let arr of tempTimesheet) {
           arr.total = this.weekdaysParseCalcHours(arr);
           arr.status = "PENDING";
            
        }
    }

    private calculateTotalHours(...hours: number[]): number {
        let tempTotal = Constant.ZERO;
        for(let num of hours) {
            tempTotal += num;
        }
       return tempTotal.valueOf();
    }


    private displayTotal(formArrayIndex: number){
        let arr = (<FormArray> this.timesheetForm.get('items')).at(formArrayIndex).value;
        this.totalDisplay[formArrayIndex] = this.weekdaysParseCalcHours(arr); 
    }

    // This method takes an argument of a formGroup object of 'items' FormArray in the timesheetForm group
    // It will call the calculateTotalHours() and pass 7 arguments each corresponding to the day of the week
    // since day properties of the object are in string, a parse is required.
    private weekdaysParseCalcHours(arr): number{
        return this.calculateTotalHours(
            (arr.daySun.length == 0 ? 0 :parseFloat(arr.daySun)), (arr.dayMon.length == 0 ? 0 :parseFloat(arr.dayMon)),
            (arr.dayTue.length == 0 ? 0 :parseFloat(arr.dayTue)), (arr.dayWed.length == 0 ? 0 :parseFloat(arr.dayWed)),
            (arr.dayThu.length == 0 ? 0 :parseFloat(arr.dayThu)), (arr.dayFri.length == 0 ? 0 :parseFloat(arr.dayFri)),
            (arr.daySat.length == 0 ? 0 :parseFloat(arr.daySat)));
    }
}

enum WeekDay {
    SUNDAY = 'Sun', MONDAY = 'Mon', TUESDAY = 'Tue',
    WEDNESDAY = 'Wed', THURSDAY = 'Thu', FRIDAY = 'Fri', SATURDAY = 'Sat'
}