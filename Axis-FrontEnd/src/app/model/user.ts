export class User {
    private _id: number;
    private _userName: string;
    private _firstName: string;
    private _lastName: string;
    private _emailAddress: string;
    private _passWord: string;
    private _gender: string;
    private _isLoggedIn: boolean = false;

    constructor(userName: string = null, firstName: string = null, lastName: string = null,
         email: string = null, password: string = null, gender: string  = null) {
            this._userName = userName;
            this._firstName = firstName;
            this._lastName = lastName;
            this._emailAddress = email;
            this._passWord = password;
            this._gender = gender;

         }

    set userName(userName: string) {
        this._userName = userName;
    }

    get userName(): string {
        return this._userName;
    }

    set firstName(firstName: string) {
        this._firstName = firstName;
    }

    get firstName(): string {
        return this._firstName;
    }

    set lastName(lastName: string) {
        this._lastName = lastName;
    }

    get lastName(): string {
        return this._lastName;
    }

    set emailAddress(email: string) {
        this._emailAddress = email;
    }

    get emailAddress(): string {
        return this._emailAddress;
    }

    set passWord(password: string) {
        this._passWord = password;
    }

    get passWord(): string {
        return this._passWord;
    }

    set gender(gender: string) {
        this._gender = gender;
    }

    get gender(): string {
        return this._gender;
    }

    set isLoggedIn(_loggedIn: boolean) {
        this._isLoggedIn = _loggedIn;
    }

    get isLoggedIn(): boolean {
        return this._isLoggedIn;
    }
}

