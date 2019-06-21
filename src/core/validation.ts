import {IErrorMessage, IValidForm} from "../types";

export class Validation {
    errorMessage:IErrorMessage;
    validForm: IValidForm;

    constructor(errorMessage:IErrorMessage, validForm: IValidForm) {
        this.errorMessage = {...errorMessage};
        this.validForm = {...validForm}
    }

    validationFields(fieldName: string, value: string) {
        let fieldValidationMessage = {...this.errorMessage};
        let validationForm = {...this.validForm};

        switch (fieldName) {
            case 'username':
                validationForm.validUsername = !/\d+/.test(value) && value.length !== 0;
                fieldValidationMessage.username = validationForm.validUsername ? '' : 'shouldn\'t contain numbers';
                break;
            case 'email':
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
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

    validationForm(registration: boolean) {
        const validForm = {...this.validForm};

        return validForm.validationForm = registration ?
            validForm.validUsername && validForm.validEmail && validForm.validPassword :
            validForm.validEmail && validForm.validPassword;
    }
}
