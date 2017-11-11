import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {ProfileComponent} from './profile.component';

@NgModule ({
    imports:[CommonModule, ReactiveFormsModule, RouterModule],
    declarations:[ProfileComponent],
    exports:[],
    providers:[]
})

export class ProfileModule{

}