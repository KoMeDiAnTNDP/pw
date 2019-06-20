import React, {Component} from 'react';

import styles from './home.module.css';
import {HeadBar} from "../head";
import {IUser} from "../../types";
import {Authorization} from "../authorization";

interface IHomeState {
    user: IUser;
    isAuthorized: boolean;
    openAuthorization: boolean;
}

export class Home extends Component{
    state: IHomeState = {
        isAuthorized: false,
        user: {
            username: '',
            balance: '',
            password: '',
            email: '',
            token: ''
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
            token: ''
        })
    };

    handleSubmit = (user: IUser) => {
        this.setState({user: user, isAuthorized: true})
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
                {openAuthorization && <Authorization onSubmit={this.handleSubmit} onClose={this.handleCloseAuthorizationForm}/>}
            </div>
        )
    }
}
