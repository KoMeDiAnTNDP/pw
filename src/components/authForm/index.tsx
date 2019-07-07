import React, {Component, FormEvent} from 'react';

import {Button} from "primereact/button";

import styles from './authForm.module.css';
import {IErrorMessage, IUserRegistration, IValidForm} from "../../types";
import {API} from "../../core/api";
import {FormError} from "../formErrors";
import {Field} from "../field";
import {Validation} from "../../core/validation";

interface IRegisterProps {
    registration: boolean;
    onSubmit(user: IUserRegistration): void;
}

interface IRegisterState {
    user: IUserRegistration;
    validForm: IValidForm;
    errorMessage: IErrorMessage;
    errorServer: string;
}

export class AuthorizationForm extends Component<IRegisterProps, IRegisterState> {
    state: IRegisterState = {
        user: {
            username: '',
            email: '',
            password: '',
            token: ''
        },
        validForm: {
            validUsername: false,
            validEmail: false,
            validPassword: false,
            validationForm: false
        },
        errorMessage: {
            username: '',
            email: '',
            password: ''
        },
        errorServer: ''
    };

    validationFormFields(fieldName: string, value: string) {
        const {errorMessage, validForm} = this.state;
        const validation = new Validation(errorMessage, validForm);
        const {fieldValidationMessage, validationForm} = validation.validationAuthFields(fieldName, value, this.props.registration);

        this.setState({
            errorMessage: fieldValidationMessage,
            validForm: validationForm
        });
    }

    getValue = (id: string, value: string) => {
        const user = {...this.state.user};

        if (id === 'username' || id === 'email' || id === 'password') {
            user[id] = value;

            this.setState({user: user}, () => {this.validationFormFields(id, value)});
        }
    };

    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const api = new API();
        api.registrationOrLogin(this.props.registration, this.state.user)
            .then(data => {
                if (typeof data === 'object') {
                    const user = {...this.state.user};
                    user.token = data.id_token;

                    this.setState({user: user});
                    this.props.onSubmit(user);
                }
                else {
                    this.setState({errorServer: data})
                }
            });
    };

    render() {
        const {validForm, errorMessage, errorServer} = this.state;
        const {registration} = this.props;

        return (
            <div className={styles.registerContainer}>
                <div className={styles.formErrors}>
                    {registration && errorMessage.username && <FormError name='username' text={errorMessage.username}/>}
                    {errorMessage.email && <FormError name='email' text={errorMessage.email}/>}
                    {errorMessage.password && <FormError name='password' text={errorMessage.password}/>}
                </div>
                <form className={styles.registerForm} method="POST" onSubmit={this.handleSubmit}>
                    {
                        registration &&
                        <Field id='username'
                               valid={!errorMessage.username}
                               getValue={this.getValue}/>
                    }
                    <Field id='email'
                           valid={!errorMessage.email}
                           getValue={this.getValue}/>
                    <Field id='password'
                           valid={!errorMessage.password}
                           getValue={this.getValue}/>
                    <Button className={styles.formButton}
                            type="submit"
                            label={registration ? 'Sign in' : 'Login'}
                            disabled={!validForm.validationForm}/>
                </form>
                {
                    errorServer &&
                    <div className={styles.serverError}>
                        <span className={styles.errorMessage}>
                            {errorServer}
                        </span>
                    </div>
                }
            </div>
        );
    }
}
