import React, {Component} from 'react';

import cn from 'classnames';
import {Panel} from "primereact/panel";

import './transactions.css';
import {IUserInfo} from "../../types";
import {Transaction} from "../transactionFormWrapper";
import {ListTransactions} from "../listTransactions";
import {Filter} from "../filter";
import {FormButton} from "../Buttons";

interface ITransactionsProps {
    user: IUserInfo;
    refresh: boolean;
    onSubmit(): void;
}

interface ITransactionState {
    openTransactionsForm: boolean;
    filter: string;
}

export class Transactions extends Component<ITransactionsProps, ITransactionState> {
    state: ITransactionState = {
        openTransactionsForm: false,
        filter: ''
    };

    handleOpenForm = () => {
        this.setState({openTransactionsForm: true})
    };

    handleCloseForm = () => {
        this.setState({openTransactionsForm: false})
    };

    handleChooseFilter = (filter: string) => {
        this.setState({filter: filter});
    };

    handleSubmit = () => {
        this.props.onSubmit();
    };

    render() {
        const {openTransactionsForm, filter} = this.state;
        const {user, refresh} = this.props;

        return (
            <div className={cn('transactionsContainers', 'p-col-12 p-md-8 p-lg-6')}>
                <Panel header='Transactions' className='transactions'>
                    <FormButton image='pi pi-plus'
                                title='Make new transaction'
                                onClick={this.handleOpenForm}/>
                    <div className='filters'>
                        <div>
                            <span className='filters__text'>Filters:</span>
                        </div>
                        <Filter name='date'
                                checked={filter === 'date'}
                                onChooseFilter={this.handleChooseFilter}/>
                        <Filter name='name'
                                checked={filter === 'name'}
                                onChooseFilter={this.handleChooseFilter}/>
                        <Filter name='amount'
                                checked={filter === 'amount'}
                                onChooseFilter={this.handleChooseFilter}/>
                    </div>
                    <ListTransactions user={user}
                                      filter={filter}
                                      refresh={refresh}/>
                </Panel>
                <Transaction user={user}
                             visible={openTransactionsForm}
                             onClose={this.handleCloseForm}
                             onSubmit={this.handleSubmit}/>
            </div>
        )
    }
}
