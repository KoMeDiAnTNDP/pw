import {IErrorMessage, IUserInfo, IValidForm} from "../types";

export class Validation {
    errorMessage:IErrorMessage;
    validForm: IValidForm;
    errors = {
        username: 'Username should be from English letters',
        email: 'Email is invalid',
        password: 'Password is too short',
        name: 'You can\'t transfer funds to yourself',
        amount: 'You don\'t have enough money Your balance: '
    };

    constructor(errorMessage:IErrorMessage, validForm: IValidForm) {
        this.errorMessage = {...errorMessage};
        this.validForm = {...validForm};
    }

    private static chooseMessage(
        fieldName: string,
        value: string,
        errorMessage: string
    ) {
        const name = `${fieldName[0].toUpperCase()}${fieldName.slice(1)}`;
        let invalidField = '';

        if (fieldName === 'username') {
            invalidField = !value.replace(/\s/g, '').length
                ? 'Username cannot contain only spaces' : errorMessage;
        }
        else {
            invalidField = errorMessage
        }

        return value.length === 0 ? `Field "${name}" must not be empty` : invalidField;
    }

    validationAuthFields(fieldName: string, value: string, registration: boolean) {
        let fieldValidationMessage = this.errorMessage;
        let validationForm = this.validForm;
        let errorMessage= '';

        switch (fieldName) {
            case 'username':
                validationForm.validUsername = /^[a-zA-Z\- ]+$/.test(value) && !!value.replace(/\s/g, '').length;
                errorMessage = Validation.chooseMessage(fieldName, value, this.errors.username);
                fieldValidationMessage.username = validationForm.validUsername ? '' : errorMessage;
                break;
            case 'email':
                // eslint-disable-next-line no-useless-escape
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                validationForm.validEmail = re.test(value.toLowerCase());
                errorMessage = Validation.chooseMessage(fieldName, value, this.errors.email);
                fieldValidationMessage.email = validationForm.validEmail ? '' : errorMessage;
                break;
            case 'password':
                validationForm.validPassword = value.length > 7;
                errorMessage = Validation.chooseMessage(fieldName, value, this.errors.password);
                fieldValidationMessage.password = validationForm.validPassword ? '' : errorMessage;
                break;
            default:
                break
        }

        validationForm.validationForm = this.validationAuthForm(registration);

        return {fieldValidationMessage, validationForm};
    }

    validationTransactionField(fieldName: string, value: string, user: IUserInfo) {
        let fieldValidationMessage = this.errorMessage;
        let validationForm = this.validForm;
        let errorMessage= '';

        switch (fieldName) {
            case 'name':
                validationForm.validUsername = value !== user.name && value.length !== 0;
                errorMessage = Validation.chooseMessage(fieldName, value, this.errors.name);
                fieldValidationMessage.username = validationForm.validUsername ? '' : errorMessage;
                break;
            case 'amount':
                validationForm.validBalance = Number(value) <= Number(user.balance) && Number(value) !== 0;
                errorMessage = Validation.chooseMessage(fieldName, value, `${this.errors.amount}${user.balance}`);
                fieldValidationMessage.balance = validationForm.validBalance ? '' : errorMessage;
                break;
            default:
                break;
        }

        validationForm.validationForm = this.validationTransactionForm();

        return {fieldValidationMessage, validationForm};
    }

    validationAuthForm(registration: boolean) {
        const validForm = {...this.validForm};
        validForm.validUsername = registration ? validForm.validUsername : true;

        return validForm.validUsername && validForm.validEmail && validForm.validPassword
    }

    validationTransactionForm() {
        return this.validForm.validUsername && this.validForm.validBalance;
    }
}
