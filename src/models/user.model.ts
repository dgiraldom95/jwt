export default class User {
    email: string;
    password: string;
    _id?: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}
