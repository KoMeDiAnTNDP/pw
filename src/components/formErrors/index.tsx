import React from 'react';

import styles from './formErorrs.module.css';

export interface IFormErrors {
    text: string;
}

export const FormError = (error: IFormErrors) => (
    <p className={styles.errorMessage}>{error.text}</p>
);
