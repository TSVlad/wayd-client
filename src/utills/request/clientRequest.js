import {keycloak} from "../../components/security/KeycloakSettings";

const clientRequest = (
    path='/',
    method='GET',
    body= null,
    headers={

    },
    url= 'http://localhost:8080',
) => {
    const request = {
        method: method,
        headers: {
            // ...headers,
            'Authorization': `Bearer ${keycloak.token}`
        }
    }

    if (method !== 'GET' && method !== 'DELETE' && ((body && body.constructor.name !== 'FormData') || (typeof body == "boolean"))) {
        request.body = JSON.stringify(body)
        request.headers = {
            ...request.headers,
            'Content-Type': 'application/json'
        }
    } else if (body && body.constructor && body && body.constructor.name === 'FormData') {
        request.body = body
    }
    return fetch(url + path, request)
}

export default clientRequest