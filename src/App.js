import React, {Component} from 'react';
import ListComputer from "./component/ListComputer";
import CreateComputer from "./component/CreateComputer";
import GetAComputer from "./component/GetAComputer";
import UpdateComputer from "./component/UpdateComputer";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Computer List</Link>
                        </li>
                        <li>
                            <Link to="/create">create</Link>
                        </li>
                        <li>
                            <Link to="/:id">search</Link>
                        </li>
                        <li>
                            <Link to="/update">update</Link>
                        </li>
                    </ul>

                    <Switch>

                        <Route path="/create">
                            <CreateComputer/>
                        </Route>

                        <Route path="/update">
                            <UpdateComputer />
                        </Route>

                        <Route path="/:id">
                            <GetAComputer />
                        </Route>

                        <Route path="/">
                            <ListComputer />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;