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

        async getUser() {
            //get user method
        }
          
        async createUser() {
            //create user method
        }
        
        return fetch(url, options);
    }
}