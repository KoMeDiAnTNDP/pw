import React, {Component} from 'react';

import cn from 'classnames'

import styles from './home.module.css';
import {HeadBar} from "../head";
import {IUserInfo, IUserRegistration} from "../../types";
import {Authorization} from "../authorization";
import {Profile} from "../profile";
import {Message} from "../message";
import {Transactions} from "../transactions";

interface IHomeProps {
    onChange(): void;
}

interface IHomeState {
    user: IUserInfo;
    openAuthorization: boolean;
    openMessage: boolean;
    animation: boolean;
    refresh: boolean;
    intervalId: number | undefined;
}

export class Home extends Component<IHomeProps, IHomeState>{
    state: IHomeState = {
        user: {
            id: '',
            name: '',
            balance: '',
            email: '',
            token: ''
        },
        openAuthorization: false,
        openMessage: true,
        animation: false,
        refresh: false,
        intervalId: undefined
    };

    clearUser: IUserInfo = {
        id: '',
        name: '',
        email: '',
        balance: '',
        token: ''
    };

    componentDidMount() {
        const intervalId = window.setInterval(this.refreshData, 10000);

        this.setState({intervalId: intervalId})
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    refreshData = () => {
        this.setState({refresh: !this.state.refresh})
    };

    handleOpenAuthorizationForm = () => {
        this.setState({openAuthorization: true});
    };

    handleCloseAuthorizationForm = () => {
        this.setState({openAuthorization: false})
    };

    handleCloseMessage = () => {
        this.setState({animation: true}, () =>
            setTimeout(() => {
                this.setState({openMessage: false, animation: false})
            }, 500)
        )
    };

    handleLogOut = () => {
        this.props.onChange();
        this.setState({user: this.clearUser})
    };

    getUserData = (user: IUserInfo) => {
        this.setState({user: user});
    };

    handleAuthorizationSubmit = (user: IUserRegistration) => {
        const regUser = {...this.state.user};
        regUser.token = user.token;

        this.setState({user: regUser}, this.handleCloseMessage);
        this.props.onChange();
    };

    handleTransactionSubmit = () => {
        this.setState({refresh: !this.state.refresh});
    };

    render() {
        const {user, openAuthorization, openMessage, animation, refresh} = this.state;
        const isAuthorized = !!user.token;

        return (
            <div className={styles.home}>
                <HeadBar wantLogin={this.handleOpenAuthorizationForm}
                         wantLogOut={this.handleLogOut}
                         isAuthorized={isAuthorized}
                         user={user}/>
                <Authorization onSubmit={this.handleAuthorizationSubmit}
                               onClose={this.handleCloseAuthorizationForm}
                               visible={openAuthorization}/>
                <div className={cn(styles.content, 'p-grid')}>
                    {
                        isAuthorized &&
                        <Profile token={user.token}
                                 refresh={refresh}
                                 getProfile={this.getUserData}/>
                    }
                    {
                        isAuthorized &&
                        <Transactions user={user}
                                      refresh={refresh}
                                      onSubmit={this.handleTransactionSubmit}/>
                    }
                </div>
                <Message onClose={this.handleCloseMessage}
                         visible={openMessage}
                         animation={animation}/>
            </div>
        )
    }
}
