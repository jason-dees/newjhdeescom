import React, { Component } from 'react';
import './App.css';
import FacebookLogo from './Images/facebook.png';
import Card from './Components/Section/Card.js';

class App extends Component {
    render() {
      //use redux for which section is active when;

        return (
            <div className="App">
              <div id="Header">
                  <div>
                      <a href="/">www.jhdees.com</a>
                  </div>
              </div>
              <nav className="navbar navbar-default">
                  <ul className="nav navbar-nav">
                      <li>
                          <a href="Overview">My Card</a>
                      </li>
                      <li>
                          <a href="Doc">Doc</a>
                      </li>
                      <li>
                          <a href="Image">Image</a>
                      </li>
                      <li>
                          <a href="https://github.com/jhdees/">GitHub</a>
                      </li>
                  </ul>
                  <ul className="nav navbar-nav pull-right hide">
                      <li>
                        <img width="32" src={FacebookLogo}/>
                      </li>
                  </ul>
              </nav>

              <Card />
            </div>
        );
    }
}

export default App;
