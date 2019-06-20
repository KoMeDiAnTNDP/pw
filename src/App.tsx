import React, { Component } from 'react';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css'
import 'primeicons/primeicons.css';

import styles from './app.module.css';
import {Home} from "./components/home";

export class App extends Component{
    render() {
        return (
            <div className={styles.pw}>
                <Home/>
            </div>
        )
    }
}
