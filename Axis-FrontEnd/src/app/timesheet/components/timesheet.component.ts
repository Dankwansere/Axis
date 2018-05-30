import {Component, OnInit, Renderer2} from '@angular/core';
import {FormGroup, FormControl, FormArray, FormBuilder} from '@angular/forms';
import {Authentication} from '../../commons/authentication';
import {User} from '../../model/user';
import {TimeSheetService} from '@services/timesheet.service';
import {ActivatedRoute} from '@angular/router';
import {BaseCommon, Constant} from '../../commons/baseCommon';
import {CanComponentDeactivate} from '../../guards/deactivate-guard.service';
import {BaseComponent} from '../../shared/components/base-component';
import swal from 'sweetalert2';


@Component({
    selector: 'timeSheet',
    templateUrl: '../view/timesheet.component.html',
    styleUrls: ['../view/timesheet.component.css']
})



export class TimesheetComponent extends BaseComponent  implements OnInit, CanComponentDeactivate {

    selectedWeek = new Date()
    totalDisplay = new Array(1);
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


    constructor(private renderer: Renderer2, private timesheetService: TimeSheetService,
         private route: ActivatedRoute, private fb: FormBuilder) {
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

        if (this.weekDayNumber === Constant.SEVEN) {
            dateOfWeek = new Date();
            tempDate = this.today.getDate();
            dateOfWeek.setDate(tempDate);
        } else {
            dateOfWeek = new Date();
            tempDate = this.today.getDate() - this.weekDayNumber;
            dateOfWeek.setDate(tempDate);
        }
        this.timesheetWeek[Constant.ZERO] = dateOfWeek.toDateString();
        this.selectedWeek = dateOfWeek;
        this.dateArray[Constant.ZERO] = dateOfWeek;

        for (i = Constant.ONE; i < Constant.FIVE; i++ ) {
            const tempCurrentDate = new Date();
            tempDate = this.today.getDate() - this.weekDayNumber - (this.fullWeeek * i);
            tempCurrentDate.setDate(tempDate);
            this.timesheetWeek[i] = tempCurrentDate.toDateString();
            this.dateArray[i] = tempCurrentDate;
        }
    }

    private projectListRetrieval(): void {
       const data = this.route.snapshot.data['timesheetResolver'];
       let i: number;

       for (i = Constant.ZERO; i < Constant.SEVEN; i++) {
            this.projectList[i] = data[i].genericName;
        }
    }

    // Parameter: dayOfWeekNumber
    // dayOfWeekNumber will be the index of the selected week
    // this index will pull the coresponding date from the dateArray
    // and also display the corresponding days of the week dynamically
    private weekDisplay(dayOfWeekNumber): void {
        const month = this.dateArray[dayOfWeekNumber].getMonth() + Constant.ONE;
        let day = this.dateArray[dayOfWeekNumber].getDate();
        let tempDate = this.dateArray[dayOfWeekNumber].toDateString();
        tempDate = tempDate.substr(0, 3) + ', ' + tempDate.substr(4)
        this.selectedWeek = this.dateArray[dayOfWeekNumber];
        this.updateFormGroupControlValue();

         for (let i = Constant.ZERO; i < Constant.SEVEN; i++ ) {
             this.weekdayDisplay[i] = month + '-' + day;
             day = day + Constant.ONE;
         }

    }


    private updateFormGroupControlValue(): void {
        const arrWeek = (<FormArray>this.timesheetForm.get('items')).controls;
        for (const arr of arrWeek) {
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


    private addNewRow(): void {
        this.items =  this.timesheetForm.get('items') as any;
        this.items.push(this.createItem());

        this.totalDisplay.length++;
    }

    private removeRow(): void {
        const arrLength = (<FormArray>this.timesheetForm.get('items')).length;
        if (arrLength > 1) {
            (<FormArray>this.timesheetForm.get('items')).removeAt(arrLength - 1);

            this.totalDisplay.length--;
        }
    }

    private timesheetPrepareAndSubmit(): void {
        this.isLoading = true;
        this.preSubmit();

       this.timesheetService.submitTimesheet(this.timesheetForm.get('items').value)
       .subscribe(data => {
           console.log(data)
           if (data.success === true) {
                this.isLoading = false;
                super.toastDialog('success', 'timesheet has been successfully submitted', 4000);
           } else {
                this.isLoading = false;
                super.toastDialog('error', 'Error submitting timesheet', 4000);
           }
        });
       this.isFormSubmitted = true;
    }

    private preSubmit(): void {
        const tempTimesheet = this.timesheetForm.get('items').value;
        for (const arr of tempTimesheet) {
           arr.total = this.weekdaysParseCalcHours(arr);
           arr.status = 'PENDING';
        }
    }

    private calculateTotalHours(...hours: number[]): number {
        let tempTotal = Constant.ZERO;
        for (const num of hours) {
            tempTotal += num;
        }
       return tempTotal.valueOf();
    }


    private displayTotal(formArrayIndex: number) {
        const arr = (<FormArray> this.timesheetForm.get('items')).at(formArrayIndex).value;
        this.totalDisplay[formArrayIndex] = this.weekdaysParseCalcHours(arr);
    }

    // This method takes an argument of a formGroup object of 'items' FormArray in the timesheetForm group
    // It will call the calculateTotalHours() and pass 7 arguments each corresponding to the day of the week
    // since day properties of the object are in string, a parse is required.
    private weekdaysParseCalcHours(arr): number {
        return this.calculateTotalHours(
            (arr.daySun.length === 0 ? 0 : parseFloat(arr.daySun)), (arr.dayMon.length === 0 ? 0 : parseFloat(arr.dayMon)),
            (arr.dayTue.length === 0 ? 0 : parseFloat(arr.dayTue)), (arr.dayWed.length === 0 ? 0 : parseFloat(arr.dayWed)),
            (arr.dayThu.length === 0 ? 0 : parseFloat(arr.dayThu)), (arr.dayFri.length === 0 ? 0 : parseFloat(arr.dayFri)),
            (arr.daySat.length === 0 ? 0 : parseFloat(arr.daySat)));
    }

     async canDeactivate () {
        if (this.timesheetForm.dirty && !this.isFormSubmitted) {
            const modalResult = await super.warningDialogYesCancel('All unsaved data will be lost');

            if (modalResult) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

}

enum WeekDay {
    SUNDAY = 'Sun', MONDAY = 'Mon', TUESDAY = 'Tue',
    WEDNESDAY = 'Wed', THURSDAY = 'Thu', FRIDAY = 'Fri', SATURDAY = 'Sat'
}
