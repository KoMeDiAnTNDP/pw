import React, {Component} from 'react';

import cn from 'classnames';

import styles from './authorization.module.css';
import {AuthorizationForm} from "../authForm";
import logo from '../../pic/parrot-logo.svg'
import {IUserRegistration} from "../../types";

interface IAuthorizationProps {
    visible: boolean;
    onClose(): void;
    onSubmit(user: IUserRegistration): void
}

interface IAuthorizationState {
    registration: boolean;
}

export class Authorization extends Component<IAuthorizationProps, IAuthorizationState> {
    state: IAuthorizationState = {
        registration: true
    };

    handleRegistrationChange = () => {
        this.setState({registration: true});
    };

    handleLoginChange = () => {
        this.setState({registration: false})
    };

    handleClose = () => {
        this.props.onClose();
    };

    handleSubmit = (user: IUserRegistration) => {
        this.props.onClose();
        this.props.onSubmit(user);
    };

    render() {
        const {registration} = this.state;
        const {visible} = this.props;

        if (!visible) {
            return null;
        }

        return (
            <div className={styles.authorizationWrapper}>
                <div className={styles.loginOrRegister}>
                    <div className={styles.authHead}>
                        <img className={styles.logo} src={logo} alt="logo"/>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.choiceAction}>
                            <span
                                onClick={this.handleRegistrationChange}
                                className={registration ? cn(styles.showRegisterForm, styles.active) : styles.showRegisterForm}
                            >
                                Sign in
                            </span>
                            <span className={styles.showFormsDivider}>/</span>
                            <span
                                onClick={this.handleLoginChange}
                                className={!registration ? cn(styles.showLoginForm, styles.active) : styles.showLoginForm}
                            >
                                Login
                            </span>
                            <span className={styles.exit} onClick={this.handleClose}/>
                        </div>
                        <AuthorizationForm registration={registration} onSubmit={this.handleSubmit}/>
                    </div>
                </div>
            </div>
        );
    }
}
