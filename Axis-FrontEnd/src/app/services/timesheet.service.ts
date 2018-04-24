import {Injectable} from '@angular/core';
import {RequestOptions, Headers} from '@angular/http';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { BaseApiService } from './baseApiService';
import {FormArray} from '@angular/forms';

@Injectable()
export class TimeSheetService {

    constructor(private _http: HttpClient,private apiService: BaseApiService) {}

    timesheetBaseUrl = "timesheet/";

    public getUserProjectList() {
        return this.apiService.getRequest('user/timesheet');
    }

    public submitTimesheet(timesheetForm: any) {
        let url = this.timesheetBaseUrl + "submitTimesheetForm";
        return this.apiService.postRequest(url, timesheetForm);
    }

}