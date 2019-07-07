import React, {Component} from 'react';

import styles from './transaction.module.css';
import logo from '../../pic/coins.svg'
import {TransactionForm} from "../transactionForm";
import {IUserInfo} from "../../types";

interface ITransactionProps {
    user: IUserInfo;
    visible: boolean;
    onClose(): void;
    onSubmit(): void;
}

export class Transaction extends Component<ITransactionProps> {
    handleClose = () => {
        this.props.onClose();
    };

    handleSubmit = () => {
        this.props.onSubmit();
        this.props.onClose();
    };

    render() {
        const {visible} = this.props;

        if (!visible) {
            return null;
        }

        return (
            <div className={styles.transactionWrapper}>
                <div className={styles.transaction}>
                    <div className={styles.transactionHead}>
                        <img className={styles.transactionLogo} src={logo} alt="logo"/>
                    </div>
                    <div className={styles.transactionContent}>
                        <span className={styles.closeTransactionForm} onClick={this.handleClose}/>
                        <TransactionForm user={this.props.user} onSubmit={this.handleSubmit}/>
                    </div>
                </div>
            </div>
        )
    }
}
