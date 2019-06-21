import React, {Component} from 'react';

import styles from './home.module.css';
import {HeadBar} from "../head";
import {IUserInfo, IUserRegistration} from "../../types";
import {Authorization} from "../authorization";
import {API} from "../../core/api";

interface IHomeState {
    user: IUserInfo;
    isAuthorized: boolean;
    openAuthorization: boolean;
}

export class Home extends Component{
    state: IHomeState = {
        isAuthorized: false,
        user: {
            id: '',
            name: '',
            balance: '',
            email: ''
        },
        openAuthorization: false
    };

    handleOpenAuthorizationForm = () => {
        this.setState({openAuthorization: true});
    };

    handleCloseAuthorizationForm = () => {
        this.setState({openAuthorization: false})
    };

    handleLogOut = () => {
        this.setState({
            isAuthorized: false,
            user: {}
        })
    };

    handleSubmit = (user: IUserRegistration) => {
        const api = new API();
        api.getInfo(user.token).then(userInfo => {
            if (typeof userInfo === 'object') {
                const user =  {...userInfo.user_info_token};

                this.setState({user: user, isAuthorized: true})
            }
        });
    };

    render() {
        const {user, isAuthorized, openAuthorization} = this.state;

        return (
            <div className={styles.home}>
                <HeadBar
                    wantLogin={this.handleOpenAuthorizationForm}
                    wantLogOut={this.handleLogOut}
                    isAuthorized={isAuthorized}
                    user={user}
                />
                <Authorization onSubmit={this.handleSubmit}
                               onClose={this.handleCloseAuthorizationForm}
                               visible={openAuthorization}/>
            </div>
        )
    }
}
