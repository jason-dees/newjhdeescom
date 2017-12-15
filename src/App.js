import React, { Component } from 'react';
import Jhdees from './Components/Jhdees.js';

import { HashRouter } from 'react-router-dom'

class App extends Component {
    render() {
        return (
            <div>
                <HashRouter>
                    <Jhdees />
                </HashRouter>
            </div>
        );
    }
}

export default App;