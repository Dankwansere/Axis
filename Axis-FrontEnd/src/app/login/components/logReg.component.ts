import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component ({
    selector: 'logReg',
    templateUrl: '../view/logReg.component.html',
    styleUrls: ['../view/logReg.component.css']
})

export class LogRegComponent {
    routeLinks: any[];
    activeLinkIndex = 0;

    constructor() {}
}
