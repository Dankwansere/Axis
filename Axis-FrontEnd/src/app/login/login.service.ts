import {Injectable} from '@angular/core';
import {ActiveUser} from './ActiveUser';


@Injectable()
export class LoginService {
    isLoggedIn : Boolean = false;
    user:ActiveUser;

    public Login(userName:string, password:string){
        this.user = new ActiveUser(userName, password);

        if(this.user.username == "Eric" && this.user.password == "123"){
            
        }
    }
}