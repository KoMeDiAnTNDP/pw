export class API {
    BaseURL = 'http://193.124.114.46:3001/';

    static handleErrors(response: Response) {
        return response.ok ? response.json() : response.text();
    }

    getData(
        url: string,
        method: string,
        body: object | null,
        headers: Headers
    ) {
        const api = `${this.BaseURL}${url}`;

        return method === 'POST' ?
            fetch(api, {
                body: JSON.stringify(body),
                method: method,
                headers: headers
            }).then(API.handleErrors) :
            fetch(api, {
                method: method,
                headers: headers
            }).then(API.handleErrors);
    }

    registrationOrLogin(registration: boolean, body: object) {
        const url = registration ? 'users' : 'sessions/create';
        const headers = new Headers({'Content-Type': 'application/json'});

        return this.getData(url, 'POST', body, headers)
    }

    getInfo(token: string) {
        const url = 'api/protected/user-info';
        const headers = new Headers(
            {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        );

        return this.getData(url, 'GET', null, headers);
    }

    makeTransaction(token: string, body: object) {
        const url = 'api/protected/transactions';
        const headers = new Headers({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        });

        return this.getData(url, 'POST', body, headers);
    }

    getTransactions(token: string) {
        const url = 'api/protected/transactions';
        const headers = new Headers({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        });

        return this.getData(url, 'GET', null, headers);
    }

    getUserList(token: string, filter: string) {
        const url = 'api/protected/users/list';
        const headers = new Headers({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        });

        return this.getData(url, 'POST', {filter: filter}, headers);
    }
}
