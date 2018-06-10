import {Component, OnInit} from '@angular/core';
import { Authentication } from '../commons/authentication';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    firstName: string;
    lastName: string;
    displayTitleMessage: string;

    constructor() {}

    public ngOnInit() {
        if (Authentication.isUserSessionActive) {
            const authName = Authentication.retrieveSessionUserObject()
             if (authName !== undefined) {
                this.firstName = authName.firstName;
                this.lastName = authName.lastName;
            }
        }
    }
}




