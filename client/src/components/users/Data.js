export default class Data {
    api(path, method = 'GET', body = null) {
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
        
        return fetch(url, options);
    }

    async getUser() {
        //create user method
    }
    
    // Creates new user
    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
                const errors = [];
                data.errors.map((error) => errors.push(error.message));
                return errors;
            });
        } else {
            throw new Error();
        }
    }
}