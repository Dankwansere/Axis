import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WebInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

       // console.log("request url: ", request.url + " ", request.urlWithParams);

        const request2 = request.clone({setHeaders: {
            Authorization: 'Bearer'}
        });
       // console.log("tt headers: ", request2.headers);

        return next.handle(request2);
    }
}
