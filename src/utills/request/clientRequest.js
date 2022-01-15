import {getCookie} from "../cookies";

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
            'Authorization': `${getCookie("wayd-token")}`
        }
    }

    if (method !== 'GET' && method !== 'DELETE' && body && body.constructor.name !== 'FormData') {
        request.body = JSON.stringify(body)
        request.headers = {
            ...request.headers,
            'Content-Type': 'application/json'
        }
    } else if (body && body.constructor && body && body.constructor.name === 'FormData') {
        request.body = body
    }

    console.log(request)

    return fetch(url + path, request)
}

export default clientRequest