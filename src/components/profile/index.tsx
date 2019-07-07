import React, {Component} from 'react';

import cn from 'classnames';

import styles from './profile.module.css';
import {IUserInfo} from "../../types";
import {Button} from "primereact/button";
import {API} from "../../core/api";
import {Panel} from "primereact/panel";

interface IProfileProps {
    user: IUserInfo;
    refresh: boolean;
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

    componentDidUpdate(prevProps: Readonly<IProfileProps>): void {
        if (this.props.refresh !== prevProps.refresh) {
            this.handleRefresh()
        }
    }

    handleRefresh = () => {
        const api = new API();

        api.getInfo(this.state.refreshUser.token)
            .then(info => {
                const token = this.state.refreshUser.token;
                const refreshUser = {...info.user_info_token, token};
                this.setState({refreshUser: refreshUser})
            })
    };

    render() {
        const {refreshUser} = this.state;

        return (
            <div className={cn(styles.profileContainer, 'p-col-12 p-md-6 p-lg-4')}>
                <Button className={styles.profileRefresh}
                        icon='pi pi-fw pi-refresh'
                        onClick={this.handleRefresh}
                        title='Refresh your data'/>
                <Panel header='Profile' className={styles.profile}>
                    <p>Name: {refreshUser.name}</p>
                    <p>Email: {refreshUser.email}</p>
                    <p>Balance: {refreshUser.balance}PW</p>
                </Panel>
            </div>
        );
    }
}
