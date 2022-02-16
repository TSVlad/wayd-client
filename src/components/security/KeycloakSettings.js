import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: "http://localhost:8484/auth",
    realm: 'WAYD',
    clientId: 'wayd-frontend',
})

export {keycloak}