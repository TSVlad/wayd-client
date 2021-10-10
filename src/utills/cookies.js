const setCookie = (name, value, expirationDate, path = '/') => {
    let cookie = `${name}=${value}; path=${path}; `
    if (expirationDate) {
        cookie += `expires=${expirationDate.toUTCString()}`
    }

    document.cookie = cookie
}

const getCookie = (name) => {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export {setCookie,  getCookie}