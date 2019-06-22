import React, {Component} from 'react';

import cn from 'classnames';

import styles from './profile.module.css';
import {IUserInfo} from "../../types";
import {Button} from "primereact/button";
import {API} from "../../core/api";

interface IProfileProps {
    user: IUserInfo;
    classname: string
}

interface IProfileState {
    refreshUser: IUserInfo;
}

export  class Profile extends Component<IProfileProps, IProfileState> {
    constructor(props:IProfileProps) {
        super(props);
        this.state = {
            refreshUser: {...props.user}
        };
    }

    handleRefresh = () => {
        const api = new API();

        api.getInfo(this.state.refreshUser.token)
            .then(info => {
                const token = this.state.refreshUser.token;
                const refreshUser = {...info.user_info_token, token};
                console.log(refreshUser)
                this.setState({refreshUser: refreshUser})
            })
    };

    render() {
        const {refreshUser} = this.state;
        const {classname} = this.props;

        return (
            <div className={cn(styles.profileContainer, classname)}>
                <div className={styles.profile}>
                    <div className={styles.titleBar}>
                        <span className={styles.title}>Profile</span>
                    </div>
                    <div className={styles.profileData}>
                        <Button className={styles.profileRefresh}
                                icon='pi pi-refresh'
                                onClick={this.handleRefresh}/>
                        <p>Name: {refreshUser.name}</p>
                        <p>Email: {refreshUser.email}</p>
                        <p>Balance: {refreshUser.balance}</p>
                    </div>
                </div>
            </div>
        );
    }
}
