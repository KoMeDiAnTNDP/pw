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
            }) :
            fetch(api, {
                method: method,
                headers: headers
            });
    }

    registrationOrLogin(registration: boolean, body: object) {
        const url = registration ? 'users' : 'sessions/create';
        const headers = new Headers({'Content-Type': 'application/json'});

        return this.getData(url, 'POST', body, headers).then(API.handleErrors)
    }

    getInfo(token: string) {
        const url = 'api/protected/user-info';
        const headers = new Headers(
            {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        );

        return this.getData(url, 'GET', null, headers).then(API.handleErrors);
    }
}
