import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {PayrollComponent} from './payroll.component';

@NgModule ({
    imports :[CommonModule, ReactiveFormsModule, RouterModule],
    declarations : [PayrollComponent],
    exports: [],
    providers: []
})
export class PayrollModule{

}