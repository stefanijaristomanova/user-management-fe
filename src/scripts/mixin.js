import axios from "axios";

let mixin = {

    // API functions for CRUD operations
    get(url, model) {
        return this.request("GET", url, model);
    },
    add(url, model) {
        return this.request("POST", url, model);
    },
    update(url, model) {
        return this.request("PUT", url, model);
    },
    delete(url) {
        return this.request("DELETE", url);
    },
    request(method, url, data) {
        let self = this;

        return new Promise(function (resolve, reject) {
            axios({
                method: method,
                url: url,
                data: data,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + self.getToken()
                }
            }).then(function (response) {
                if (((response.status == 200 || response.status == 201 || response.status == 204 || response.status == 'success'))
                    || response.statusText == "OK") {
                    resolve(response.data);
                } else if (response.status == 401 || response.status == 403) {
                    self.clearToken();
                    window.location = "/";
                } else {
                    //error handling
                    // reject(response.statusText);
                }
            }).catch(function (error) {
                if (error == 'Error: Request failed with status code 401' || error == 'Error: Request failed with status code 404') {
                    self.clearToken();
                    window.location = "/";
                }
                reject(error);
            });
        });
    },


    //storage functions
    setToken(token) {
        localStorage.setItem('token', token);
    },
    getToken() {
        return localStorage.getItem('token');
    },
    clearToken() {
        localStorage.removeItem('token');
    },

    //check if user is logged in
    userLoggedIn: function () {
        if (localStorage.getItem('token')) {
            return true;
        }
    },

    // get the email from token
    getEmail() {
        let parsed_token = JSON.parse(atob(this.getToken().split('.')[1]));
        return parsed_token.sub;
    }

}

export default mixin;