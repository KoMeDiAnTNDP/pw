import React, {FormEvent} from 'react';
import {Password} from "primereact/password";
import styles from "./field.module.css";
import {InputText} from "primereact/inputtext";
import cn from "classnames";

interface IFieldProps {
    id: string;
    value: string;
    onChange: (event: FormEvent<HTMLInputElement>) => void;
    text: string;
    valid: boolean;
}

export const Field = (props: IFieldProps) => {
    const fieldClassName =  cn('p-float-label', styles.registrationFields);
    const inputField = props.valid ? styles.inputField : cn(styles.inputField__error, styles.inputField);

    return (
        <span className={fieldClassName}>
                {
                    props.id === 'password' ?
                        <Password
                            id={props.id}
                            value={props.value}
                            onChange={props.onChange}
                            className={inputField}
                            feedback={false}
                            required
                        /> :
                        <InputText
                            id={props.id}
                            type={props.id === 'email' ? 'email' : 'text'}
                            value={props.value}
                            onChange={props.onChange}
                            className={inputField}
                            required
                        />
                }
            <label htmlFor={props.id}>{props.text}</label>
            </span>
    )
}
