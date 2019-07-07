import React, { Component } from 'react';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css'
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import styles from './app.module.css';
import {Home} from "./components/home";

interface IAppState {
    isAuthorized: boolean;
}

export class App extends Component{
    state: IAppState = {
        isAuthorized: false
    };

    handleChange = () => {
        this.setState({
            isAuthorized: !this.state.isAuthorized
        })
    };

    render() {
        const {isAuthorized} = this.state;
        const pwClassName = isAuthorized ? styles.pw__auth : styles.pw;

        return (
            <div className={pwClassName}>
                <Home onChange={this.handleChange}/>
            </div>
        )
    }
}
