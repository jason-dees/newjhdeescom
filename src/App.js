import management from './Reducers/management.js';
import { createStore } from 'redux';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Jhdees from './Components/Jhdees.js';

const store = createStore(
    management
);

class App extends Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                    <Jhdees />
                </Provider>
            </div>
        );
    }
}

export default App;