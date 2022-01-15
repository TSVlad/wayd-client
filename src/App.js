import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";import Home from "./components/pages/Home";
import NavbarWayd from "./components/navbar/NavbarWayd";
import Categories from "./components/pages/Categories";
import EventPage from "./components/pages/EventPage";
import NewEventPage from "./components/pages/NewEventPage";
import EditEventPage from "./components/pages/EditEventPage";

function App() {
    return (
        <Router>
            <div className="App">

                <NavbarWayd/>
                <Switch>
                    <Route path="/categories">
                        <Categories/>
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
    );
}

export default App;
