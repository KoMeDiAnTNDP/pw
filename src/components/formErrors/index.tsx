import React from 'react';

import styles from './formErorrs.module.css';

export interface IFormErrors {
    name: string;
    text: string;
    transaction?: boolean;
}

export const FormError = (error: IFormErrors) => !error.transaction ?(
    <p className={styles.errorMessage}>{error.name} {error.text}</p>
) : (
    <p className={styles.errorMessage}>{error.text}</p>
);
