import {Injectable} from '@angular/core';
import {ActiveUser} from './ActiveUser';
import {Http, RequestOptions, Headers} from '@angular/http';


@Injectable()
export class LoginService {
    isLoggedIn : boolean = false;
    user:ActiveUser;

    constructor(private _http: Http){

    }

    public loginPostRequest(user){
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post("http://localhost:7070/axis/user/login", user, options);

    }

    public registerPostRequest(userRegistrationForm){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post("http://localhost:7070/axis/user/create", userRegistrationForm, options);
    }

    public validateUserNameGetRequest(username:string){
        return this._http.get("http://localhost:7070/axis/user/validate/" + username);
    }
}