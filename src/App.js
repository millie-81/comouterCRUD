import React, {Component} from 'react';
import ListComputer from "./component/ListComputer";
import CreateComputer from "./component/CreateComputer";
import EditForm from "./component/EditForm";


class App extends Component {
    render() {
        return (
            <div>
                <ListComputer/>
                <CreateComputer/>
                <EditForm/>
            </div>
        );
    }
}

export default App;