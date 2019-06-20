import React, {Component} from 'react';

import cn from 'classnames';

import styles from './authorization.module.css';
import {Form} from "../form";
import logo from '../../pic/parrot.svg'
import {IUser} from "../../types";

interface IAuthorizationProps {
    onClose(): void;
    onSubmit(user: IUser): void
}

interface IAuthorizationState {
    registration: boolean;
    close: boolean;
}

export class Authorization extends Component<IAuthorizationProps, IAuthorizationState> {
    state: IAuthorizationState = {
        registration: true,
        close: false

    };

    handleRegistrationChange = () => {
        this.setState({registration: true});
    };

    handleLoginChange = () => {
        this.setState({registration: false})
    };

    handleClose = () => {
        this.props.onClose();
        this.setState({close: true});
    };

    handleSubmit = (user: IUser) => {
        this.props.onClose();
        this.props.onSubmit(user);
        this.setState({close: true})
    };

    render() {
        const {registration, close} = this.state;

        if (close) {
            return null;
        }

        return (
            <div className={styles.wrapper}>
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
                                Register
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
                        <Form registration={registration} onSubmit={this.handleSubmit}/>
                    </div>
                </div>
            </div>
        );
    }
}
