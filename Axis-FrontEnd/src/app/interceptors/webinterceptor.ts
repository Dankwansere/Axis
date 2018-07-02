import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {User} from '../model/user';
import {Authentication} from '../commons/authentication';
@Injectable()
export class WebInterceptor implements HttpInterceptor {

    private user: User;

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let interceptedRequest: HttpRequest<any>;
        this.user = Authentication.retrieveSessionUserObject();
        let jwtToken: string;

        if (this.user != null || this.user != undefined) {
            jwtToken = this.user.token;
        }

        if (jwtToken) {
             interceptedRequest = request.clone({setHeaders: {
                Authorization: this.user.token}
            });
            console.log('Intercepted request: ', interceptedRequest)
            return next.handle(interceptedRequest);
        } else {
            return next.handle(request);
        }

    }
}
