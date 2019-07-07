import React, {Component} from 'react';

import cn from 'classnames'

import styles from './home.module.css';
import {HeadBar} from "../head";
import {IUserInfo, IUserRegistration} from "../../types";
import {Authorization} from "../authorization";
import {API} from "../../core/api";
import {Profile} from "../profile";
import {Message} from "../message";
import {Transactions} from "../transactions";

interface IHomeProps {
    onChange(): void;
}

interface IHomeState {
    user: IUserInfo;
    isAuthorized: boolean;
    openAuthorization: boolean;
    openMessage: boolean;
    animation: boolean;
    refresh: boolean;
}

export class Home extends Component<IHomeProps, IHomeState>{
    state: IHomeState = {
        isAuthorized: false,
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
        refresh: false
    };

    handleOpenAuthorizationForm = () => {
        this.setState({openAuthorization: true});
    };

    handleCloseAuthorizationForm = () => {
        this.setState({openAuthorization: false})
    };

    handleCloseMessage = () => {
        this.setState({
            animation: true
            }, () =>
            setTimeout(() => {
                this.setState({
                    openMessage: false,
                    animation: false
                })
            }, 500)
        )
    };

    handleLogOut = () => {
        const unauthUser: IUserInfo = {
            id: '',
            name: '',
            email: '',
            balance: '',
            token: ''
        } ;

        this.props.onChange();
        this.setState({
            isAuthorized: false,
            user: unauthUser
        })
    };

    handleAuthorizationSubmit = (user: IUserRegistration) => {
        const api = new API();
        api.getInfo(user.token).then(userInfo => {
            if (typeof userInfo === 'object') {
                const token = user.token;
                const regUser =  {...userInfo.user_info_token, token};

                this.props.onChange();
                this.setState({
                    user: regUser,
                    isAuthorized: true,
                }, this.handleCloseMessage)
            }
        });
    };

    handleTransactionSubmit = () => {
        this.setState({
            refresh: true,
        });
    };

    render() {
        const {user, isAuthorized, openAuthorization, openMessage, animation, refresh} = this.state;

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
                    {isAuthorized && <Profile user={user} refresh={refresh}/>}
                    {isAuthorized && <Transactions user={user} refresh={refresh} onSubmit={this.handleTransactionSubmit}/>}
                </div>
                <Message onClose={this.handleCloseMessage}
                         visible={openMessage}
                         animation={animation}/>
            </div>
        )
    }
}
