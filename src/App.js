import './App.css';
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import Home from "./components/pages/Home";
import NavbarWayd from "./components/navbar/NavbarWayd";
import Categories from "./components/pages/Categories";
import EventPage from "./components/pages/EventPage";
import NewEventPage from "./components/pages/NewEventPage";
import UsersEventsPage from "./components/pages/UsersEventsPage";
import UserParticipationPage from "./components/pages/UserParticipationPage";
import NotificationsPage from "./components/pages/NotificationsPage";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import {keycloak} from "./components/security/KeycloakSettings";
import {useEffect} from "react";
import {deleteCookie, getCookie, setCookie} from "./utills/cookies";
import {bindActionCreators} from "redux";
import {setUserAction} from "./store/actionCreators/actionCreators";
import {connect} from "react-redux";

function App(props) {

    useEffect(() => {
        const token = getCookie('wayd-token')
        if (token) {
            const tokenArray = token.split('.')
            const payload = JSON.parse(atob(tokenArray[1]))
            if (!props.user) {
                props.setUserDispatch(payload)
            }
        }
    }, [props])

    return (
        <ReactKeycloakProvider authClient={keycloak} initOptions={{onLoad: 'check-sso',
            silentCheckSsoRedirectUri:  window.location.origin + '/silent-check-sso.html'}}
                               onTokens={(tokens) => {
                                   if (tokens.token) {
                                       setCookie('wayd-token', tokens.token)
                                       props.setUserDispatch(keycloak.tokenParsed)
                                   }
                               }}>

            <Router>
                <div className="App">
                    <NavbarWayd/>
                    <Switch>
                        <Route path={"/notifications"}>
                            <NotificationsPage/>
                        </Route>
                        <Route path="/categories">
                            <Categories/>
                        </Route>
                        <Route path={"/events/user/:userId/participation"}>
                            <UserParticipationPage/>
                        </Route>
                        <Route path={"/events/user/:userId"}>
                            <UsersEventsPage/>
                        </Route>
                        <Route path={"/event/new"}>
                            <NewEventPage/>
                        </Route>
                        <Route path={"/event/edit/:eventId"}>
                            <EventPage edit={true}/>
                        </Route>
                        <Route path={"/event/:eventId"}>
                            <EventPage/>
                        </Route>
                        <Route path="/">
                            <Home/>
                        </Route>
                    </Switch>
                </div>
            </Router>

        </ReactKeycloakProvider>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            setUserDispatch: setUserAction,
        },
        dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
