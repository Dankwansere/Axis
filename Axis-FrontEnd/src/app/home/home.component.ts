import {Component, OnInit} from '@angular/core';
import { Authentication } from '../commons/authentication';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    userName: string;

    public ngOnInit() {
        if(Authentication.isUserSessionActive) {
            this.userName = Authentication.retrieveSessionUserObject().userName;
        }
    }
}




