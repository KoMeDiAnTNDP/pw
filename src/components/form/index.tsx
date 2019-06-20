import React, {Component, FormEvent} from 'react';

import styles from './form.module.css';
import {IErrorMessage, IUser, IValidForm} from "../../types";
import {API} from "../../core/api";
import {Button} from "primereact/button";
import {FormError} from "../formErrors";
import {Field} from "../field";

interface IRegisterProps {
    registration: boolean;
    onSubmit(user: IUser): void;
}

interface IRegisterState {
    user: IUser;
    validForm: IValidForm;
    errorMessage: IErrorMessage;
    success: boolean;
    failMessage: string;
}

export class Form extends Component<IRegisterProps, IRegisterState> {
    state: IRegisterState = {
        user: {
            username: '',
            email: '',
            password: '',
            balance: '',
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
        success: false,
        failMessage: ''
    };

    validationFormFields(fieldName: string, value: string) {
        let fieldValidationMessage = {...this.state.errorMessage};
        let validForm = {...this.state.validForm};

        switch (fieldName) {
            case 'username':
                validForm.validUsername = !/\d+/.test(value) && value.length !== 0;
                fieldValidationMessage.username = validForm.validUsername ? '' : 'shouldn\'t contain numbers';
                break;
            case 'email':
                // eslint-disable-next-line no-useless-escape
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                validForm.validEmail = re.test(value.toLowerCase());
                fieldValidationMessage.email = validForm.validEmail ? '' : 'is invalid';
                break;
            case 'password':
                validForm.validPassword = value.length > 7;
                fieldValidationMessage.password = validForm.validPassword ? '' : 'is too short';
                break;
            default:
                break
        }

        this.setState({
            errorMessage: fieldValidationMessage,
            validForm: validForm
        }, this.validateForm);
    }

    validateForm() {
        const validForm = {...this.state.validForm};

        if (this.props.registration) {
            validForm.validationForm = validForm.validUsername && validForm.validEmail && validForm.validPassword;
        }
        else {
            validForm.validationForm = validForm.validEmail && validForm.validPassword;
        }

        this.setState({validForm: validForm})
    }

    handleUsernameChange = (event: FormEvent<HTMLInputElement>) => {
        const user = {...this.state.user};
        user.username = event.currentTarget.value;

        this.setState({user: user}, () => this.validationFormFields('username', user.username));
    };

    handleEmailChange = (event: FormEvent<HTMLInputElement>) => {
        const user = {...this.state.user};
        user.email = event.currentTarget.value;

        this.setState({user: user}, () => this.validationFormFields('email', user.email));
    };

    handlePasswordChange = (event: FormEvent<HTMLInputElement>) => {
        const user = {...this.state.user};
        user.password = event.currentTarget.value;

        this.setState({user: user}, () => this.validationFormFields('password', user.password));
    };

    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        const api = new API();
        api.registrationOrLogin(this.props.registration, this.state.user)
            .then(data => {
                if (typeof data === 'object') {
                    const user = {...this.state.user};
                    user.token = data.id_token;

                    this.props.onSubmit(user);
                    this.setState({user: user, success: true})
                }
                else {

                    this.setState({failMessage: data, success: false})
                }
            });


    };

    render() {
        const {user, validForm, errorMessage, success, failMessage} = this.state;
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
                        <Field
                            id='username' value={user.username}
                            onChange={this.handleUsernameChange} text='Username'
                            valid={!errorMessage.username}
                        />
                    }
                    <Field
                        id='email' value={user.email}
                        onChange={this.handleEmailChange} text='Email'
                        valid={!errorMessage.email}
                    />
                    <Field
                        id='password' value={user.password}
                        onChange={this.handlePasswordChange} text='Password'
                        valid={!errorMessage.password}
                    />
                    <Button
                        className={styles.formButton} type="submit"
                        label={registration ? 'Sign in' : 'Login'} disabled={!validForm.validationForm}
                    />
                </form>
                {
                    !success &&
                    <div className={styles.serverError}>
                        <span className={styles.errorMessage}>
                            {failMessage}
                        </span>
                    </div>
                }
            </div>
        );
    }
}
