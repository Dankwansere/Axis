import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {CareerModule} from './career/career.module';
import {PayrollModule} from './payroll/payroll.module';
import {ProfileModule} from './profile/profile.module';
import {LoginModule} from './login/login.module';
import {TimesheetModule} from './timesheet/timesheet.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import {HomeComponent} from './home/home.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

import {routing} from './app.routing';
import {AuthGuard} from './guards/auth-guard.service';
import {CanDeactivateGuard} from './guards/deactivate-guard.service'

import {WebInterceptor} from './interceptors/webinterceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  declarations: [
    AppComponent, HomeComponent, PageNotFoundComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, CareerModule,
    PayrollModule, ProfileModule, LoginModule, TimesheetModule, routing, BrowserAnimationsModule
  ],
  providers: [AuthGuard, CanDeactivateGuard, { provide: HTTP_INTERCEPTORS, useClass: WebInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
