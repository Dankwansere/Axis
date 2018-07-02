import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject
export class User {
    private _id: number;

    @JsonProperty('userName', String)
    private _userName: string;
    @JsonProperty('firstName', String)
    private _firstName: string;
    @JsonProperty('lastName', String)
    private _lastName: string;
    @JsonProperty('emailAdd', String)
    private _emailAddress: string;
    @JsonProperty('passWord', String)
    private _passWord: string;
    @JsonProperty('gender', String)
    private _gender: string;
    @JsonProperty('role', String)
    private _role: string;

    private _isLoggedIn: boolean = false;
    private _token: string;

    constructor(userName: string = null, firstName: string = null, lastName: string = null,
         email: string = null, password: string = null,
          gender: string  = null, role: string = null, token: string = null) {
            this._userName = userName;
            this._firstName = firstName;
            this._lastName = lastName;
            this._emailAddress = email;
            this._passWord = password;
            this._gender = gender;
            this._role = role;
            this._token = token;
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

    set role(role: string) {
        this._role = role;
    }

    get role(): string {
        return this._role;
    }

    set isLoggedIn(_loggedIn: boolean) {
        this._isLoggedIn = _loggedIn;
    }

    get isLoggedIn(): boolean {
        return this._isLoggedIn;
    }

    set token(token: string) {
        this._token = token;
    }

    get token(): string {
        return this._token;
    }
}

