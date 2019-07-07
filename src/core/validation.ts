import {IErrorMessage, IUserInfo, IValidForm} from "../types";

export class Validation {
    errorMessage:IErrorMessage;
    validForm: IValidForm;

    constructor(errorMessage:IErrorMessage, validForm: IValidForm) {
        this.errorMessage = {...errorMessage};
        this.validForm = {...validForm};
    }

    validationAuthFields(fieldName: string, value: string) {
        let fieldValidationMessage = {...this.errorMessage};
        let validationForm = {...this.validForm};

        switch (fieldName) {
            case 'username':
                validationForm.validUsername = !/\d+/.test(value) && value.length !== 0;
                fieldValidationMessage.username = validationForm.validUsername ? '' : 'shouldn\'t contain numbers';
                break;
            case 'email':
                // eslint-disable-next-line no-useless-escape
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                validationForm.validEmail = re.test(value.toLowerCase());
                fieldValidationMessage.email = validationForm.validEmail ? '' : 'is invalid';
                break;
            case 'password':
                validationForm.validPassword = value.length > 7;
                fieldValidationMessage.password = validationForm.validPassword ? '' : 'is too short';
                break;
            default:
                break
        }

        return {fieldValidationMessage, validationForm};
    }

    validationTransactionField(fieldName: string, value: string, user: IUserInfo) {
        let fieldValidationMessage = {...this.errorMessage};
        let validationForm = {...this.validForm};

        switch (fieldName) {
            case 'name':
                validationForm.validUsername = value !== user.name && value.length !== 0;
                fieldValidationMessage.username = validationForm.validUsername ? '' : 'You can\'t transfer funds to yourself';
                break;
            case 'amount':
                validationForm.validBalance = Number(value) <= Number(user.balance);
                fieldValidationMessage.balance = validationForm.validBalance ? ''
                    // eslint-disable-next-line no-useless-escape
                    : `You don\'t have enough money Your balance: ${user.balance}`;
                break;
            default:
                break;
        }

        return {fieldValidationMessage, validationForm};
    }

    validationAuthForm(registration: boolean) {
        const validForm = {...this.validForm};

        return validForm.validationForm = registration ?
            validForm.validUsername && validForm.validEmail && validForm.validPassword :
            validForm.validEmail && validForm.validPassword;
    }

    validationTransactionForm() {

        return this.validForm.validUsername && this.validForm.validBalance;
    }
}
