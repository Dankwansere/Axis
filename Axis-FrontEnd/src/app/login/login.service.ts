import {Injectable} from '@angular/core';
import {ActiveUser} from './ActiveUser';


@Injectable()
export class LoginService {
    isLoggedIn : boolean = false;
    user:ActiveUser;

    public Login(userName:string, password:string): boolean{
        this.user = new ActiveUser(userName, password);

        if(this.user.username == "Eric" && this.user.password == "123"){
            this.isLoggedIn = true;
        }

        return  this.isLoggedIn;
    }
}