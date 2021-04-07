
class ApiFetch {

    constructor(baseURL="") {
        if(baseURL === "")
            this.baseURL = "http://localhost:26595";
        else
            this.baseURL = baseURL;
    }

    get(url) {
        return fetch(`${this.baseURL}/${url}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response =>  response.json() );
    }

    getAuth(url) {
        const headersA = this.getHeaders();

        return fetch(`${this.baseURL}/${url}`, {
                method: "get",
                headers: headersA
            })
            .then(response =>  response.json() );
    }

    post(url, data) {
        const body = JSON.stringify(data);

        return fetch(`${this.baseURL}/${url}`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: body
            })
            .then(response =>  response.json() );
    }

    postAuth(url, data) {
        const headersA = this.getHeaders();
        const body = JSON.stringify(data);
        
        return fetch(`${this.baseURL}/${url}`, {
            method: "post",
            headers: headersA,
            body: body
        })
        .then(response =>  response.json() );
    }

    put(url, data) {
        
        const body = JSON.stringify(data);

        return fetch(`${this.baseURL}/${url}`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                body: body
            })
            .then(response =>  response.json() );
    }

    putAuth(url, data) {
        const headersA = this.getHeaders();

        const body = JSON.stringify(data);

        return fetch(`${this.baseURL}/${url}`, {
                method: "put",
                headers: headersA,
                body: body
            })
            .then(response =>  response.json() );
    }

    delete(url) {
        
        return fetch(`${this.baseURL}/${url}`, {
                method: "delete",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            .then(response =>  response.json() );
    }

    deleteAuth(url) {
        const headersA = this.getHeaders();

        return fetch(`${this.baseURL}/${url}`, {
                method: "delete",
                headers: headersA
            })
            .then(response =>  response.json() );
    }

    getToken() {
        const token = localStorage.getItem("jwt");
        return token;
    }

    getHeaders() {
        const token = this.getToken();
        const headersA = new Headers({
            "Content-Type": "application/json",
            "Auth": token
        });

        return headersA;
    }

}

const apiFetch = new ApiFetch("http://localhost:26000");
export {apiFetch};