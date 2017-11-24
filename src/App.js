import React, { Component } from 'react';
import Jhdees from './Components/Jhdees.js';

import createHistory from 'history/createBrowserHistory'
import {Router } from 'react-router-dom'

const history = createHistory();

class App extends Component {
    render() {
        return (
            <div>
                <Router history={history}>
                    <Jhdees />
                </Router>
            </div>
        );
    }
}

export default App;