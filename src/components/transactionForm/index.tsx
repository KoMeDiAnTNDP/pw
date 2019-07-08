import React, {Component, FormEvent} from 'react';

import {Button} from "primereact/button";

import {IErrorMessage, IUserInfo, IValidForm} from "../../types";
import styles from './transactionForm.module.css';
import {Field} from "../field";
import {Validation} from "../../core/validation";
import {FormError} from "../formErrors";
import {API} from "../../core/api";
import {Names} from "../names";

interface ITransactionFormProps {
    user: IUserInfo;
    onSubmit(): void;
}

interface ITransactionFormState {
    recipient: string;
    amount: string;
    user: IUserInfo;
    validFrom: IValidForm;
    errorMessage: IErrorMessage;
    errorServer: string;
}

export class TransactionForm extends Component<ITransactionFormProps, ITransactionFormState> {
    constructor(props: ITransactionFormProps) {
        super(props);

        this.state = {
            user: props.user,
            errorMessage: {
                username: '',
                balance: ''
            },
            validFrom: {
                validUsername: false,
                validBalance: false
            },
            recipient: '',
            amount: '',
            errorServer: ''
        }
    }

    validationFieldForms = (fieldName: string, value: string) => {
        const {user, validFrom, errorMessage} = this.state;
        const {validationForm, fieldValidationMessage} = new Validation(errorMessage, validFrom)
            .validationTransactionField(fieldName, value, user);

        this.setState({
            validFrom: validationForm,
            errorMessage: fieldValidationMessage
        })
    };

    getValue = (id: string, value: string) => {
        this.setState({amount: value},
            () => this.validationFieldForms(id, value))
    };

    getName = (recipient: string) => {
        this.setState({recipient: recipient},
            () => this.validationFieldForms('name', recipient))
    };

    getError = (errorMessage: string) => {
        this.setState({errorServer: errorMessage})
    };

    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const {user, recipient, amount} = this.state;
        const body = {name: recipient, amount: amount};

        const api = new API();
        api.makeTransaction(user.token, body)
            .then(data => {
                if (typeof data === 'object') {
                    this.props.onSubmit();
                }
                else {
                    this.setState({errorServer: data})
                }
            })
    };

    render() {
        const {errorMessage, validFrom, errorServer} = this.state;
        const {user} = this.props;

        return (
            <div className={styles.transactionFromContainer}>
                <div className={styles.transactionsErrors}>
                    {errorMessage.username && <FormError text={errorMessage.username}/>}
                    {errorMessage.balance && <FormError text={errorMessage.balance}/>}
                </div>
                <form className={styles.transactionForm} method="POST" onSubmit={this.handleSubmit}>
                    <Names user={user} getName={this.getName} getError={this.getError}/>
                    <Field id="amount" valid={!errorMessage.balance} getValue={this.getValue}/>
                    <Button className={styles.buttonForm}
                            type="submit"
                            label="Send"
                            disabled={!validFrom.validationForm}/>
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
        )
    }
}
