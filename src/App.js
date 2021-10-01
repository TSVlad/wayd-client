import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";import Home from "./components/pages/Home";
import NavbarWayd from "./components/navbar/NavbarWayd";

function App() {
    return (
        <Router>
            <div className="App">

                <NavbarWayd/>
                <Switch>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
