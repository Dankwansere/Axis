import {Injectable} from '@angular/core';
import {RequestOptions, Headers} from '@angular/http';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { BaseApiService } from './baseApiService';

@Injectable()
export class TimeSheetService {

    constructor(private _http: HttpClient,private apiService: BaseApiService) {}

    public getUserProjectList() {
        return this.apiService.getRequest('user/timesheet');
    }

}