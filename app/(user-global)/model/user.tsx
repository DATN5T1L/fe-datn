export class User {
    user_id: number;
    username: string;
    password: string;
    fullname: string;
    age: number;
    email: string;
    avatar: string;
    phonenumber: string;
    balance: number;
    PIN: string;
    status_provider: string;
    provider_id: string;
    created_at: Date;
    updated_at: Date;

    constructor(
        user_id: number,
        username: string,
        password: string,
        fullname: string,
        age: number,
        email: string,
        avatar: string,
        phonenumber: string,
        balance: number,
        PIN: string,
        status_provider: string,
        provider_id: string,
        created_at: Date,
        updated_at: Date
    ) {
        this.user_id = user_id;
        this.username = username;
        this.password = password;
        this.fullname = fullname;
        this.age = age;
        this.email = email;
        this.avatar = avatar;
        this.phonenumber = phonenumber;
        this.balance = balance;
        this.PIN = PIN;
        this.status_provider = status_provider;
        this.provider_id = provider_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    displayInfo() {
        return `${this.fullname} - Email: ${this.email} - Balance: ${this.balance}$`;
    }
}
