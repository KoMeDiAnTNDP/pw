import React, {Component} from 'react';

import styles from './list.module.css';

import {ITransaction, IUserInfo} from "../../types";
import {API} from "../../core/api";
import {List} from "../../core/listOfTransaction";

interface IListProps {
    user: IUserInfo;
    refresh: boolean;
    filter: string;
}

interface IListState {
    transactions: ITransaction[];
    message: string;
}

export class ListTransactions extends Component<IListProps, IListState> {
    state: IListState = {
        transactions: [],
        message: ''
    };

    componentDidMount(): void {
        this.fetchTransaction();
    }

    componentDidUpdate(prevProps: Readonly<IListProps>): void {
        if (this.props.refresh !== prevProps.refresh) {
            this.fetchTransaction();
        }

        if (this.props.filter !== prevProps.filter) {
            this.sortTransaction(this.state.transactions, this.props.filter);
        }
    }

    sortTransaction(transactions: ITransaction[], filter: string) {
        const sortTransactions = new List(transactions).sort(filter);

        this.setState({transactions: sortTransactions})
    }

    fetchTransaction = () => {
        const api = new API();
        const token = this.props.user.token;

        api.getTransactions(token)
            .then(data => {
                if (typeof data === 'object') {
                    const transactions = [...data.trans_token];

                    if (transactions.length === 0) {
                        this.setState({message: 'You have no transaction history yet.'})
                    }
                    else {
                        this.setState({transactions: transactions});
                    }
                }
                else {
                    this.setState({message: data})
                }
            })
    };

    render() {
        const {transactions, message} = this.state;

        return (
            <div className={styles.listTransactionsWrapper}>
                <div className={styles.listTransactions}>
                    {
                        transactions.map((transaction, index) => {
                            const {transactionClassName, transactionMessage} = List.getAnswer(transaction, message);

                            return (
                                <p className={transactionClassName} key={index}>
                                    {transactionMessage}
                                </p>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
