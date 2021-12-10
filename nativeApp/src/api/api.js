class fetchAPI {
    post(uri, body) {
        return fetch(uri, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        }).then((res) => res.json());
    }

    get(uri) {
        return fetch(uri, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((res) => res.json());
    }

    delete(uri, body) {
        return fetch(uri, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        }).then((res) => res.json());
    }
}

const API = new fetchAPI();
export { API };