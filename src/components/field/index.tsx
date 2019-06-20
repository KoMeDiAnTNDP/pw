import React, {Component, FormEvent} from 'react';

import cn from "classnames";

import styles from "./field.module.css";
import {Password} from "primereact/password";
import {InputText} from "primereact/inputtext";

interface IFieldProps {
    id: string;
    valid: boolean;
    getValue(id: string, value: string): void
}

interface IFieldState {
    value: string;
}

export class Field extends Component<IFieldProps, IFieldState> {
    state: IFieldState = {
        value: ''
    };

    makeText = (id: string) => {
        return `${id.charAt(0).toUpperCase()}${id.slice(1)}`
    };

    handleChange = (event: FormEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;

        this.props.getValue(this.props.id, value);
        this.setState({value: value});
    };

    render() {
        const {id, valid} = this.props;
        const {value} = this.state;
        const fieldClassName =  cn('p-float-label', styles.registrationFields);
        const inputField = valid ? styles.inputField : cn(styles.inputField__error, styles.inputField);

        return (
            <span className={fieldClassName}>
            {
                id === 'password' ?
                    <Password id={id}
                              value={value}
                              onChange={this.handleChange}
                              className={inputField}
                              feedback={false}
                              required/> :
                    <InputText id={id}
                               type={id === 'email' ? 'email' : 'text'}
                               value={value}
                               onChange={this.handleChange}
                               className={inputField}
                               required/>
            }
                <label htmlFor={id}>{this.makeText(id)}</label>
            </span>
        );
    }
}

/*export const Field = (props: IFieldProps) => {
    const fieldClassName =  cn('p-float-label', styles.registrationFields);
    const inputField = props.valid ? styles.inputField : cn(styles.inputField__error, styles.inputField);

    return (
        <span className={fieldClassName}>
            {
                props.id === 'password' ?
                    <Password id={props.id}
                              value={props.value}
                              getValue={props.getValue}
                              className={inputField}
                              feedback={false}
                              required/> :
                    <InputText id={props.id}
                               type={props.id === 'email' ? 'email' : 'text'}
                               value={props.value}
                               getValue={props.getValue}
                               className={inputField}
                               required/>
                }
                <label htmlFor={props.id}>{props.text}</label>
            </span>
    )
};*/


