import { Component } from '@angular/core';
import {LoginService} from '@services/login.service';
import { Authentication } from 'app/commons/authentication';
import { AfterViewInit, OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {LoginComponent} from '@login/components/login.component';
import {RegisterComponent} from '@login/components/register.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {



  constructor(private _loginService: LoginService, private dialog: MatDialog) {}

  public openDialog(componentName: String) {
    let dialogComp;

    if (componentName === 'login') {
      dialogComp = LoginComponent;
    } else if (componentName === 'register') {
      dialogComp = RegisterComponent;
    }
    const dialogRef = this.dialog.open(dialogComp);

    dialogRef.afterClosed().subscribe(result => {

    })
}

  public logout() {
    Authentication.invalidateUserSession();
  }

  public isUserOnline(): boolean {
    return Authentication.isUserSessionActive();
  }

  public ngOnInit() {
    return this.isUserOnline();
  }

}


