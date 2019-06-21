export interface IUserInfo {
    id: string;
    name: string;
    email: string;
    balance: string;
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
    validationForm: boolean
}

export interface IErrorMessage {
    username: string;
    email: string;
    password: string;
}
