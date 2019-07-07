import React, {Component, FormEvent} from 'react';

import cn from 'classnames';
import {AutoComplete} from "primereact/autocomplete";
import {Button} from "primereact/button";

import {IErrorMessage, IUserInfo, IValidForm} from "../../types";
import styles from './transactionForm.module.css';
import {Field} from "../field";
import {Validation} from "../../core/validation";
import {FormError} from "../formErrors";
import {API} from "../../core/api";
import {debounce} from "../../core/debounce";

interface ITransactionFormProps {
    user: IUserInfo;
    onSubmit(): void;
}

interface ITransactionFormState {
    user: IUserInfo;
    validFrom: IValidForm;
    errorMessage: IErrorMessage;
    recipient: string;
    amount: string;
    suggestions: string[];
    success: boolean;
    failedMessage: string;
}

export class TransactionForm extends Component<ITransactionFormProps, ITransactionFormState> {
    constructor(props: ITransactionFormProps) {
        super(props);

        this.state = {
            user: props.user,
            errorMessage: {
                username: '',
                email: '',
                password: '',
                balance: ''
            },
            validFrom: {
                validUsername: false,
                validEmail: false,
                validPassword: false,
                validBalance: false,
                validationForm: false
            },
            recipient: '',
            amount: '',
            suggestions: [],
            success: true,
            failedMessage: ''
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

    handleNameChange = (event: {originalEvent: Event , value: any}) => {
        this.setState({recipient: event.value},
            () => this.validationFieldForms('name', event.value));
    };

    fetchNames = () => {
        const api = new API();
        const token = this.state.user.token;
        const value = this.state.recipient;

        api.getUserList(token, value)
            .then((data: [{id: number, name: string}]) => {
                if (typeof data === 'object') {
                    const names = Object.values(data).map(name => name.name);
                    console.log(names);
                    this.setState({suggestions: names})
                }
            })
    };

    getName = debounce(this.fetchNames, 10000);

    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const {user, recipient, amount} = this.state;
        const body = {
            name: recipient,
            amount: amount
        };

        const api = new API();
        api.makeTransaction(user.token, body)
            .then(data => {
                if (typeof data === 'object') {
                    this.setState({success: true});
                    this.props.onSubmit();
                }
                else {
                    this.setState({
                        success: false,
                        failedMessage: data
                    })
                }
            })
    };

    render() {
        const {recipient, errorMessage, validFrom, suggestions, success, failedMessage} = this.state;
        const activeButton = new Validation(errorMessage, validFrom).validationTransactionForm();
        const inputClassName = !errorMessage.username ? styles.inputField : cn(styles.inputField, styles.inputField__error);
        console.log(this.props.user.token);

        return (
            <div className={styles.transactionFromContainer}>
                <div className={styles.transactionsErrors}>
                    {errorMessage.username && <FormError name="name" text={errorMessage.username} transaction={true}/>}
                    {errorMessage.balance && <FormError name="balance" text={errorMessage.balance} transaction={true}/>}
                </div>
                <form className={styles.transactionForm} method="POST" onSubmit={this.handleSubmit}>
                    <span className={cn(styles.transactionFields,'p-float-label')}>
                        <AutoComplete value={recipient}
                                      className={styles.inputField}
                                      inputClassName={inputClassName}
                                      onChange={this.handleNameChange}
                                      suggestions={suggestions}
                                      completeMethod={this.getName}/>
                        <label htmlFor="name">Name</label>
                    </span>
                    <Field id="amount" valid={!errorMessage.balance} getValue={this.getValue}/>
                    <Button className={styles.buttonForm}
                            type="submit"
                            label="Send"
                            disabled={!activeButton}/>
                </form>
                {
                    !success &&
                    <div className={styles.serverError}>
                        <span className={styles.errorMessage}>
                            {failedMessage}
                        </span>
                    </div>
                }
            </div>
        )
    }
}
