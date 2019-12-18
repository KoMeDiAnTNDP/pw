import React, {Component} from 'react';
import cn from "classnames";
import {AutoComplete} from "primereact/autocomplete";
import {IUserInfo} from "../../types";
import {API} from "../../core/api";
import {debounce} from "../../core/debounce";
import styles from './names.module.css'

interface INamesProps {
    user: IUserInfo;
    getName(recipient: string): void;
    getError(errorMessage: string): void;
}

interface INamesState {
    recipient: string;
    suggestions: string[];
    validUsername: boolean;
}

export class Names extends Component<INamesProps, INamesState> {
    state: INamesState = {
        recipient: '',
        suggestions: [],
        validUsername: false
    };

    fetchNames = () => {
        const api = new API();
        const token = this.props.user.token;
        const value = this.state.recipient;
        console.log('не сразу');

        if (value.length === 0) {
            this.setState({suggestions: []});
            return;
        }

        api.getUserList(token, value)
            .then((data: [{id: number, name: string}] | string) => {
                if (typeof data === 'object') {
                    const names = Object.values(data).map(name => name.name);
                    this.setState({suggestions: names})
                }
                else {
                    this.props.getError(data);
                }
            })
    };

    getNames = debounce(this.fetchNames, 2000);

    handleNameChange = (event: {originalEvent: Event , value: any}) => {
        this.setState({recipient: event.value});
        this.props.getName(event.value);
    };

    render() {
        const {recipient, suggestions, validUsername} = this.state;
        const inputClassName = !validUsername ? styles.inputField : cn(styles.inputField, styles.inputField__error);

        return (
            <span className={cn(styles.transactionFields,'p-float-label')}>
                <AutoComplete value={recipient}
                              className={styles.inputField}
                              inputClassName={inputClassName}
                              onChange={this.handleNameChange}
                              suggestions={suggestions}
                              completeMethod={this.getNames}
                              delay={0}/>
                <label htmlFor="name">Name</label>
            </span>
        )
    }
}
