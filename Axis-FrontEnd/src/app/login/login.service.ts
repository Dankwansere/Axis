import {Injectable} from '@angular/core';
import {RequestOptions, Headers} from '@angular/http';
import {HttpClient} from "@angular/common/http";
import {User} from '../model/user';


@Injectable()
export class LoginService {

    constructor(private _http: HttpClient) {

    }

    public loginPostRequest(user) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this._http.post('http://localhost:7070/axis/user/login', user);

    }

    public registerPostRequest(userRegistrationForm){
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this._http.post('http://localhost:7070/axis/user/create', userRegistrationForm);
    }

    public validateUserNameGetRequest(username: string) {
        return this._http.get('http://localhost:7070/axis/user/validate/' + username);
    }
}