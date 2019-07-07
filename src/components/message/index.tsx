import React from 'react';

import {Button} from "primereact/button";
import cn from 'classnames';

import styles from './message.module.css'
import parrot from '../../pic/parrot.svg'

interface IMessageProps {
    onClose(): void;
    visible: boolean;
    animation: boolean;
}

export const Message = (props: IMessageProps) => {
    const messageClassName = props.animation ? cn(styles.messageContainer, styles.messageContainerClose) : styles.messageContainer;

    if (!props.visible) {
        return null;
    }

    return (
        <div className={messageClassName}>
            <div className={styles.messageItem}>
                <Button className={styles.buttonClose} icon='pi pi-fw pi-times' onClick={props.onClose}/>
                <div className={styles.message}>
                    <span className={styles.messageTittle}>You are not authorized</span>
                    <div className={styles.messageContent}>
                        <p className={styles.messageText}>Click on the parrot</p>
                        <img className={styles.messageParrot} src={parrot} alt='parrot'/>
                    </div>
                </div>
            </div>
        </div>
    )
};
