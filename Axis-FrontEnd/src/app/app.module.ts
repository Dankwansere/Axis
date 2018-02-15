import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {CareerModule} from './career/career.module';
import {PayrollModule} from './payroll/payroll.module';
import {ProfileModule} from './profile/profile.module';
import {LoginModule} from './login/login.module';

import { AppComponent } from './app.component';
import {HomeComponent} from './home/home.component';
import {routing} from './app.routing';
import {LoginService} from './login/login.service';
import {AuthGuard} from './auth-guard.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent, HomeComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, CareerModule,
    PayrollModule, ProfileModule, LoginModule, routing
  ],
  providers: [LoginService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
