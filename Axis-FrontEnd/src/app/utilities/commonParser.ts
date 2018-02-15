import {User} from '../model/user';

export class CommonParser {

    // Parsing a JSON String object to a typescript object
    public static parseJsonToUserObject(userJson): User {
        const user = new User(userJson.userName, userJson.firstName, userJson.lastName,
         userJson.emailAdd, userJson.passWord, userJson.gender);

         if (user.userName === null) {
             return null;
         }

         return user;
    }

    // Parse a javascript prototype object to a typescript object
    public static parsePrototypeObjectToUserObject(userPrototype){
        const user = new User(userPrototype._userName, userPrototype._firstName, userPrototype._lastName,
            userPrototype._emailAddress, userPrototype._passWord, userPrototype._gender);
            if (user.userName === null) {
                return null;
            }

            return user;
    }
}
