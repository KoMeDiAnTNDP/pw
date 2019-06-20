export interface IUser {
    username: string;
    email: string;
    password: string;
    balance: string;
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
