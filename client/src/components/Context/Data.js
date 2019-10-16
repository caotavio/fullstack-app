export default class Data {
    //core interaction with the REST API
    api(history, path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        let url = process.env.API_URI || `http://localhost:5000`;
        url = `${url}/api${path}`;

        const options = {
            method,
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
        };

        //converts the request's body to json if it is present 
        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        //checks if authorization is needed
        if (requiresAuth) {
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }

        return fetch(url, options).then((response) => {
            return this.handleResponse(history, response)
        }).catch(() =>{
            //if the API is down, the user is going to be redirected to /error
            return this.handleResponse(history, { status: 503 })
        });
    }

    //handles all the responses from the API
    handleResponse(history, response) {
        const res = {
            error: false,
            errors: {},
            data: []
        };
        switch (response.status) {
            case 200:
                return response.json().then(data => {
                    res.data = data;
                    return res;
                });
            case 201:
            case 204:
                break;
            case 403:
                history.push('/forbidden')
                res.error = true;
                break;
            case 404:
                history.push('/notfound')
                res.error = true;
                break;
            case 422:
            case 401:
                return response.json().then(data => {
                    res.error = true;
                    res.errors = data.errors;
                    return res;
                });
            case 500:
            default:
                history.push('/error');
                res.error = true;
                break;
        }

        return res;
    }

    /* 
      Asynchronous methods that handle all of the CRUD (PUT, GET, PUT and DELETE methods) operations
    */
    
    // Returns the authenticated user
    async getUser(history, emailAddress, password) {
        return await this.api(history, `/users`, 'GET', null, true, { emailAddress, password });
    }
    
    // Creates and logs in a new user
    async createUser(history, user) {
        return await this.api(history, '/users', 'POST', user);
    }

    // Gets a full log of available courses
    async getCourses(history) {
        return await this.api(history, '/courses', 'GET', null);
    }

    // Gets a course's details by id
    async getCourseDetail(history, id) {
        return await this.api(history, `/courses/${id}`, 'GET', null);
    }

    // Creates a course if one of the users is logged in
    async createCourse(history, course, emailAddress, password) {
        return await this.api(history, `/courses`, 'POST', course, true, { emailAddress, password });
    }
    
    // Updates a course if the authenticated user is its creator
    async updateCourse(history, course, id, emailAddress, password) {
        return await this.api(history, `/courses/${id}`, 'PUT', course, true, { emailAddress, password });
    }

    // Deletes a course if the authenticated user is its creator
    async deleteCourse(history, id, emailAddress, password) {
        return await this.api(history, `/courses/${id}`, 'DELETE', null, true, { emailAddress, password });
    }
}