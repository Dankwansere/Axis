import {Component, OnInit} from '@angular/core';
import { Authentication } from '../commons/authentication';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    userName: string;
    displayTitleMessage: string;

    constructor() {}

    public ngOnInit() {
        if(Authentication.isUserSessionActive) {
            let authName = Authentication.retrieveSessionUserObject()
             if(authName != undefined) {
                this.userName = authName.userName;
            }
        }
    }
}




