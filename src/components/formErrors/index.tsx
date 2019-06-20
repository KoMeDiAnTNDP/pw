import React from 'react';

import styles from './formErorrs.module.css';

export interface IFormErrors {
    name: string;
    text: string;
}

export const FormError = (error: IFormErrors) => (
    <p className={styles.errorMessage}>{error.name} {error.text}</p>
);
