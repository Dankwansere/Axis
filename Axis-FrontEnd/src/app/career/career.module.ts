import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {CareerComponent} from './career.component'

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    declarations: [CareerComponent],
    exports:[],
    providers: []
})

export class CareerModule {

}

