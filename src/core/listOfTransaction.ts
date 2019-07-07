import {ITransaction} from "../types";
import styles from "../components/listTransactions/list.module.css";

export class List {
    transactions: ITransaction[];

    constructor(transactions: ITransaction[]) {
        this.transactions = List.deepCopy(transactions);
    }

    private static deepCopy<T>(target: T): T {
        if (target === null) {
            return target;
        }
        if (target instanceof Date) {
            return new Date(target.getTime()) as any;
        }
        if (target instanceof Array) {
            const cp = [] as any[];
            (target as any[]).forEach((v) => { cp.push(v); });
            return cp.map((n: any) => List.deepCopy<any>(n)) as any;
        }
        if (typeof target === 'object' && target !== {}) {
            const cp = { ...(target as { [key: string]: any }) } as { [key: string]: any };
            Object.keys(cp).forEach(k => {
                cp[k] = List.deepCopy<any>(cp[k]);
            });
            return cp as T;
        }
        return target;
    }

    sort(filter: string): ITransaction[] {
        switch (filter) {
            case 'date':
                return this.sortByDate();
            case 'name':
                return this.sortByName();
            case 'amount':
                return this.sortByAmount();
            default:
                return this.sortByDate().reverse();
        }
    }

    static getAnswer(transaction: ITransaction, message: string): {transactionClassName: string, transactionMessage: string} {
        let transactionClassName = '';
        let transactionMessage = '';
        const transactionAmount = transaction.amount.toString();
        let amount = '';
        let active = '';

        if (message.length !== 0) {
            transactionClassName = styles.error;
            transactionMessage = message;

            return {transactionClassName, transactionMessage};
        }

        if (transactionAmount[0] === '-') {
            transactionClassName = styles.transaction;
            amount = transactionAmount.slice(1);
            active = 'Withdrawal';
        }
        else {
            transactionClassName = styles.refill;
            amount = transactionAmount;
            active = 'Refill'
        }

        const article = active === 'Withdrawal' ? 'to' : 'from';
        transactionMessage = `${active} ${transaction.date}: ${amount} ${article} ${transaction.username}. Your Balance: ${transaction.balance}`;

        return {transactionClassName, transactionMessage};
    };

    private static sortByYearOrTime(first: string, second: string, filter: string): number {
        const separator = filter === 'year' ? '-' : ':';
        const firstData = first.split(separator).map(value => parseFloat(value));
        const secondData = second.split(separator).map(value => parseFloat(value));

        if (firstData[0] !== secondData[0]) {
            return firstData[0] - secondData[0];
        }
        else if (firstData[1] !== secondData[1]) {
            return firstData[1] - secondData[1]
        }

        return firstData[2] - secondData[2];
    }

    private sortByDate(): ITransaction[] {
        const clone = List.deepCopy(this.transactions);

        clone.sort((curTransaction: ITransaction, prevTransaction: ITransaction) => {
            const firstDate = curTransaction.date.split(' ');
            const secondDate = prevTransaction.date.split(' ');
            let result = List.sortByYearOrTime(firstDate[0], secondDate[0], 'year');

            if (result === 0) {
                result = List.sortByYearOrTime(firstDate[1], secondDate[1], 'time');
            }

            return result;
        });

        return clone.reverse();
    }

    private sortByName(): ITransaction[] {
        const clone = List.deepCopy(this.transactions);

        clone.sort((curTransaction: ITransaction, prevTransaction: ITransaction) => {
            const firstName = curTransaction.username;
            const secondName = prevTransaction.username;

            return firstName.localeCompare(secondName);
        });

        return clone.reverse();
    }

    private sortByAmount(): ITransaction[] {
        const clone = List.deepCopy(this.transactions);

        clone.sort((curTransaction: ITransaction, prevTransaction: ITransaction) => {
            const firstAmount = parseFloat(curTransaction.amount);
            const secondAmount = parseFloat(prevTransaction.amount);

            return firstAmount - secondAmount;
        });

        return clone;
    }
}
