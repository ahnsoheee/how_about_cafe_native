import Config from "react-native-config";

class fetchAPI {
    async post(uri, body) {
        const res = await fetch(`${Config.SERVER_URL}:${Config.PORT}${uri}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        return await res.json();
    }

    async get(uri) {
        const res = await fetch(`${Config.SERVER_URL}:${Config.PORT}${uri}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        return await res.json();
    }

    async delete(uri, body) {
        const res = await fetch(`${Config.SERVER_URL}:${Config.PORT}${uri}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        return await res.json();
    }

    async patch(uri, body) {
        const res = await fetch(`${Config.SERVER_URL}:${Config.PORT}${uri}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        return await res.json();
    }
}

const API = new fetchAPI();
export { API };