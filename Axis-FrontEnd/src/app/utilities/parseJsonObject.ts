import {User} from '../model/user';
export class ParseJsonObject {

    public static convertJsonToUserObject(userJson): User {
        const user = new User(userJson.id, userJson.userName, userJson.firstName, userJson.lastName,
         userJson.emailAdd, userJson.passWord, userJson.gender);

         if(user.getUserName() === null){
             return null;
         }

         return user;
    }
}