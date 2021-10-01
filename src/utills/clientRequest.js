
const clientRequest = (
    path='/',
    method='GET',
    body={},
    headers={
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    url= 'http://localhost:8080',
) => {

    return fetch(url + path, {
        method: method,
        headers: {
            ...headers,
            'authorization': `${localStorage.getItem("token")}`
        },
        body: JSON.stringify(body)
    })
}

export default clientRequest