import {User} from '../model/user';
import {CommonParser} from '../utilities/commonParser';

export  class Authentication {

    static readonly ACTIVE_USER: string = 'activeUser';
    static isDisplayNameUpdated: boolean;
    static isUserActive: boolean;

    static isUserSessionActive(): boolean {

        if (sessionStorage.getItem(Authentication.ACTIVE_USER)) {
            Authentication.isUserActive = true;
            Authentication.updateDisplayName();
            return true;
        } else {
            return false;
        }

    }

    // If user successfully logs in, set user object in session storage
    // and update display name with user login ID
    static setUserInSession(userObj: User) {
        sessionStorage.setItem(Authentication.ACTIVE_USER, JSON.stringify(userObj));
        Authentication.isUserActive = true;
        Authentication.updateDisplayName();
    }

    // If user logs out or session has been invalidated,
    // remove user object from session and remove display name.
    static invalidateUserSession() {
        sessionStorage.removeItem(Authentication.ACTIVE_USER);
        Authentication.isUserActive = false;
        Authentication.removeDisplayName();
     }

     // Retrieving the user object that was stored into session storage
     // Since JSON.Parse converts a JSON string to a JavaScript prototype object
     // an utility method CommonParser.parsePrototypeObjectToUserObject is used to parse
     // the prototype object to a typscript equivalent
    static retrieveSessionUserObject(): User {
         let user: User;
         if (Authentication.isUserActive) {
            user = CommonParser.parsePrototypeObjectToUserObject(JSON.parse(sessionStorage.getItem(Authentication.ACTIVE_USER)));
         }

         return user;
     }

    private static updateDisplayName() {
        const displayName = document.getElementById('navbarDropdown');
        if (Authentication.isUserActive && !Authentication.isDisplayNameUpdated) {
            const user: User = Authentication.retrieveSessionUserObject();
            displayName.innerText = user.userName;
            Authentication.isDisplayNameUpdated = true;
        }
    }

    private static removeDisplayName() {
        const displayName = document.getElementById('navbarDropdown');
        displayName.innerText = 'Sign In';
        Authentication.isDisplayNameUpdated = false;
    }

}
