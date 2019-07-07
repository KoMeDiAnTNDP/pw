export interface IUserInfo {
    id: string;
    name: string;
    email: string;
    balance: string;
    token: string;
}

export interface IUserRegistration {
    username: string;
    email: string;
    password: string;
    token: string;
}

export interface IValidForm {
    validUsername: boolean;
    validEmail: boolean;
    validPassword: boolean;
    validBalance: boolean;
    validationForm: boolean
}

export interface IErrorMessage {
    username: string;
    email: string;
    password: string;
    balance: string;
}

export interface ITransaction {
    id: string;
    date: string;
    username: string;
    amount: string;
    balance: string;
}
