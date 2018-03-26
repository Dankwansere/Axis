import {Injectable} from '@angular/core';
import { BaseApiService } from './baseApiService';


@Injectable()
export class LoginService {

    constructor(private apiService: BaseApiService) {}

    public loginPostRequest(user) {
        return this.apiService.postRequest('user/login', user);
    }

    public registerPostRequest(userRegistrationForm){
        return this.apiService.postRequest('user/create', userRegistrationForm);
    }

    public validateUserNameGetRequest(username: string) {
        return this.apiService.getRequest('user/validate/', username);
    }
}