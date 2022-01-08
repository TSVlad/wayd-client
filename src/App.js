import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";import Home from "./components/pages/Home";
import NavbarWayd from "./components/navbar/NavbarWayd";
import Categories from "./components/pages/Categories";
import Event from "./components/pages/Event";
import NewEventPage from "./components/pages/NewEventPage";

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
                    <Route path={"/event/:eventId"}>
                        <Event/>
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
