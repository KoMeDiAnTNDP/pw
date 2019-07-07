import React, {Component} from 'react';

import cn from 'classnames';
import {RadioButton} from "primereact/radiobutton";

import styles from './filter.module.css';
import {Checkbox} from "primereact/checkbox";
import {checkPropTypes} from "prop-types";

interface IFilterProps {
    name: string;
    checked: boolean;
    onChooseFilter(filter: string): void;
}

interface IFilterState {
    filter: string;
}

export class Filter extends Component<IFilterProps, IFilterState> {
    state: IFilterState = {
        filter: ''
    };

    getText() {
        const name = this.props.name;

        return `${name[0].toUpperCase()}${name.slice(1)}`
    }

    handleChange = (event: {originalEvent: Event, value: any}) => {
        const filter = this.props.checked ? '' : event.value;
        this.setState({filter: filter});
        this.props.onChooseFilter(filter);
    };

    render() {
        const {name, checked} = this.props;

        const filterClassName = checked ? styles.filter_checked : styles.filter;

        return (
            <div className={filterClassName}>
                <Checkbox className={styles.filter__checkbox}
                             inputId={name}
                             name='filter'
                             value={name}
                             onChange={this.handleChange}
                             checked={checked}/>
                <label htmlFor={name} className={styles.filter__text}>{this.getText()}</label>
            </div>
        )
    }
}
