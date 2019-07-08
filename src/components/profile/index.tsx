import React, {Component} from 'react';

import cn from 'classnames';
import {Panel} from "primereact/panel";

import styles from './profile.module.css';
import {IUserInfo} from "../../types";
import {API} from "../../core/api";
import {FormButton} from "../Buttons";

interface IProfileProps {
    token: string;
    refresh: boolean;
    getProfile(user: IUserInfo): void;
}

interface IProfileState {
    user: IUserInfo;
}

export  class Profile extends Component<IProfileProps, IProfileState> {
    state: IProfileState = {
        user: {
            id: '',
            name: '',
            email: '',
            balance: '',
            token: ''
        }
    };

    static checkUser(user: IUserInfo) {
        for (const key in user) {
            if ((user as any)[key] !== null && (user as any)[key] !== '') {
                return false;
            }
        }

        return true;
    }

    componentDidMount(): void {
        this.fetchDataProfile();
    }

    componentDidUpdate(prevProps: Readonly<IProfileProps>): void {
        if (this.props.refresh !== prevProps.refresh) {
            this.fetchDataProfile();
        }
    }

    fetchDataProfile = () => {
        const api = new API();
        api.getInfo(this.props.token)
            .then(info => {
                const token = this.props.token;
                const refreshUser = {...info.user_info_token, token};

                if (Profile.checkUser(this.state.user)) {
                    this.props.getProfile(refreshUser);
                }

                this.setState({user: refreshUser})
            })
    };

    render() {
        const {user} = this.state;

        return (
            <div className={cn(styles.profileContainer, 'p-col-12 p-md-6 p-lg-4')}>
                <Panel header='Profile' className={styles.profile}>
                    <FormButton image='pi pi-refresh' title='Refresh your data' onClick={this.fetchDataProfile}/>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Balance: {user.balance}PW</p>
                </Panel>
            </div>
        );
    }
}
