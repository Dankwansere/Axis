import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router'
import {TimeSheetService} from './timesheet.service';
import {Injectable} from '@angular/core';

@Injectable()
export class TimesheetResolver implements Resolve<Object> {

    constructor(private timeSheetService: TimeSheetService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.timeSheetService.getUserProjectList();
    }

}