import React from 'react';

import cn from 'classnames';

import styles from './profile.module.css';
import {IUserInfo} from "../../types";

interface IProfileProps {
    user: IUserInfo;
    visible: boolean
    classname: string
}

export const Profile = ({user, visible, classname}: IProfileProps) => {
    if (!visible) {
        return null;
    }

    return (
        <div className={cn(styles.profileContainer, classname)}>
            <div className={styles.profile}>
                <div className={styles.titleBar}>
                    <span className={styles.title}>Profile</span>
                </div>
                <div className={styles.profileData}>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Balance: {user.balance}</p>
                </div>
            </div>
        </div>
    );
};
