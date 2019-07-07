import React, {Component, FormEvent} from 'react';

import cn from "classnames";
import {InputText} from "primereact/inputtext";

import styles from "./field.module.css";

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

    checkNumbers = (value: string) => {
        if (isNaN(Number(value))) {
            return;
        }

        this.props.getValue(this.props.id, value);
        this.setState({value: value});
    };

    handleChange = (event: FormEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;

        if (this.props.id === 'amount') {
            this.checkNumbers(value);
        }
        else {
            this.props.getValue(this.props.id, value);
            this.setState({value: value});
        }
    };

    render() {
        const {id, valid} = this.props;
        const {value} = this.state;
        const fieldClassName =  cn('p-float-label', styles.registrationFields);
        const inputField = valid ? styles.inputField : cn(styles.inputField__error, styles.inputField);

        return (
            <span className={fieldClassName}>
                <InputText id={id}
                           type={id}
                           value={value}
                           onChange={this.handleChange}
                           className={inputField}
                           required/>
                <label htmlFor={id}>{this.makeText(id)}</label>
            </span>
        );
    }
}
