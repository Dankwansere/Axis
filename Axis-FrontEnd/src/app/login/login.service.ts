import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import {User} from '../model/user';


@Injectable()
export class LoginService {
    //isLoggedIn: boolean = false;

    constructor(private _http: Http) {

    }

    public loginPostRequest(user) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this._http.post('http://localhost:7070/axis/user/login', user, options);

    }

    public registerPostRequest(userRegistrationForm){
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this._http.post('http://localhost:7070/axis/user/create', userRegistrationForm, options);
    }

    public validateUserNameGetRequest(username: string) {
        return this._http.get('http://localhost:7070/axis/user/validate/' + username);
    }
}