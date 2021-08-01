export default class HttpRequest {
    constructor(route, method) {
        this.route = route;
        this.method = method;
    }

    setToken = (token) => {
        this.token = token;
        return this;
    };

    setBody = (body) => {
        this.body = JSON.stringify(body);
        return this;

    };

    send = async () => {
        const response = await fetch('/api/' + this.route, {
            methos: this.method,
            headers: this.getHeaders(),
            body: this.body,
        });

        const responseContent = await response.json();

        return {
            ok: response.ok,
            errorMessage: response.ok
                ? null
                : Array.isArray(responseContent)
                ? responseContent.join(' ')
                : responseContent,
            data: response.ok ? responseContent : null,
        };
    };

    getHeaders = () => {
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        };

        if (this.token) {
            headers['Authorization'] = 'Bearer' + this.token;
        }

        return headers;
    };
}

