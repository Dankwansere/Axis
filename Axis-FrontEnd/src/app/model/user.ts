export class User {
    private id: number;
    private userName: string;
    private firstName: string;
    private lastName: string;
    private email: string;
    private passWord: string;
    private gender: string;
    private _isLoggedIn: boolean = false;

    constructor(id: number, userName: string, firstName: string, lastName: string,
         email: string, password: string, gender: string ) {
            this.id = id;
            this.userName = userName;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.passWord = password;
            this.gender = gender;

         }

    public setUserName(userName: string) {
        this.userName = userName;
    }

    public getUserName(): string {
        return this.userName;
    }

    public setFirstName(firstName: string) {
        this.firstName = firstName;
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public setLastName(lastName: string) {
        this.lastName = lastName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public setEmail(email: string) {
        this.email = email;
    }

    public getEmail(): string {
        return this.email;
    }

    public setPassWord(password: string) {
        this.passWord = password;
    }

    public getPassWord(): string {
        return this.passWord;
    }

    public setGender(gender: string) {
        this.gender = gender;
    }

    public getGender(): string {
        return this.gender;
    }

    public setLoggedIn(loggedIn: boolean) {
        this._isLoggedIn = loggedIn;
    }

    public isLoggedIn(): boolean {
        return this._isLoggedIn;
    }
}

