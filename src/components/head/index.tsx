import React, {Component} from 'react';

import {Menu} from 'primereact/menu'
import {MenuItem} from "primereact/api";

import styles from './head.module.css';
import {IUserInfo} from "../../types";

interface IHeadProps {
    wantLogin(): void
    wantLogOut(): void
    isAuthorized: boolean;
    user: IUserInfo;
}

interface IHeadState {
    profile: MenuItem;
    unregistered: MenuItem;
    registered: MenuItem;
}

export class HeadBar extends Component<IHeadProps, IHeadState> {
    menu: any;

    state: IHeadState = {
        profile: {
            label: 'Profile',
            icon: 'pi pi-fw pi-user'
        },
        registered: {
            label: 'Log out',
            icon: 'pi pi-fw pi-sign-out',
            command: () => {
                this.props.wantLogOut();
            }
        },
        unregistered: {
            label: 'Log in',
            icon: 'pi pi-fw pi-sign-in',
            command: () => {
                this.props.wantLogin();
            }
        }
    };

    render() {
        const {profile, registered, unregistered} = this.state;
        const {isAuthorized, user} = this.props;
        const items: MenuItem[] = isAuthorized ? [profile, registered] : [unregistered];

        return (
            <div className={styles.head}>
                <div className={styles.menuWrapper}>
                    <div className={styles.menu}>
                        <div className={styles.profile} onClick={(event) => {this.menu.toggle(event)}}>
                            <div className={styles.profileImageWrapper}>
                                <span className={styles.profileImage}/>
                            </div>
                            {
                                isAuthorized ?
                                    <div className={styles.profileData}>
                                        <span className={styles.profileName}>
                                            {user.name}
                                        </span>
                                    </div> : <span className={styles.profileUnauth}>Log in?</span>
                            }
                        </div>
                        <Menu model={items} popup={true} ref={el => this.menu = el} className={styles.customMenu}/>
                    </div>
                </div>
            </div>
        );
    }
}
