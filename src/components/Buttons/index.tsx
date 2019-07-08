import React from 'react';

import {Button} from "primereact/button";

import styles from './formButton.module.css'

interface IFormButtonProps {
    image: string;
    title: string
    onClick(): void;
}

export const FormButton = (props: IFormButtonProps) => {
    return (
        <Button className={styles.formButton}
                icon={props.image}
                onClick={props.onClick}
                title={props.title}/>
    )
};
