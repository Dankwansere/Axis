import {Injectable} from '@angular/core';
import { BaseApiService } from './baseApi.service';


@Injectable()
export class LoginService {

    constructor(private apiService: BaseApiService) {}

    public loginPostRequest(user) {

        const options: any = {};
        options.observe = 'response';

        return this.apiService.postRequest('user/login', user, options);
    }

    public registerPostRequest(userRegistrationForm) {
        return this.apiService.postRequest('user/create', userRegistrationForm);
    }

    public validateUserNameGetRequest(username: string) {
        return this.apiService.getRequest('user/validate/', username);
    }
}
