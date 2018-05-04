import { Component } from '@angular/core';
import {LoginService} from './services/login.service';
import { Authentication } from 'app/commons/authentication';
import { AfterViewInit, OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  user: string;

  constructor(private _loginService: LoginService) {

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


