export default class Data {
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = `http://localhost:5000/api${path}`;

        const options = {
            method,
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        if (requiresAuth) {
            const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }
        
        return fetch(url, options);
    }

    handleResponse(response) {
        switch (response.status) {
            case 201:
            case 200:
                return response.json().then(data => data);
            case 403:
                this.props.history.push('/forbidden')
                break
            case 404:
                this.props.history.push('/notfound')
                break
            case 500:
                return response.json().then(data => {
                    throw new Error(data.message);
                });
            case 422:
            case 401:
                return response.json().then(data => {
                    throw new Error(data.message);
                });
            default:
                this.props.history.push('/unhandlederror');
                break;
        }
    }

    // Gets the user
    async getUser(username, password) {
        const response = await this.api(`/users`, 'GET', null, true, { username, password });
        return this.handleResponse(response);

    }
    
    // Creates new user
    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        return this.handleResponse(response);
    }
}