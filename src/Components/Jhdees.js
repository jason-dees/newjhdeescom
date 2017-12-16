import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Styles/Jhdees.css';
import FacebookLogo from '../Images/facebook.png';
import Card from './Section/Card.js';
import Image from './Section/Image.js';
import Doc from './Section/Doc.js';
import { Pages, tabLocationCheck} from '../Actions/siteactions.js'
import '../bootstrap/css/bootstrap.min.css';
import { Switch, Route, Link } from 'react-router-dom'

// the issue with this is that linking directly 
//to doc/1 will try to make a web call to /doc/1 
//instead of routing through the 
//react app. I need it to route through react app
//Hashes allow for that. This router does not
class Jhdees extends Component {
    render() {
        return (
            <div className="Jhdees">
                <JhdeesMenu  menuItems={Pages} />
                <Switch>
                    <Route exact path='/' component={Card} />
                    <Route path='/doc/:docId' component={Doc} />
                    <Route exact path='/doc' component={Doc} />
                    <Route path='/image' component={Image} />
                </Switch>
            </div>
        );
    }
}

class JhdeesMenu extends Component{
    static propTypes = {
        menuItems: PropTypes.array.isRequired,
    };

    render() {
        const { menuItems } = this.props;
        return (
            <div>
                <div id="Header">
                    <div>
                        <a href="/">www.jhdees.com</a>
                    </div>
                </div>
                <nav className="navbar navbar-default">
                    <ul className="nav navbar-nav">
                        {menuItems.map((item, index) =>
                           <li key={item.route} className={tabLocationCheck(window.location, item.route) ? "active": ""}>
                                <Link to={item.route}>{item.title}</Link>
                           </li>)
                        }
                        <li>
                            <a href="https://recipes.jhdees.com">Recipes</a>
                        </li>
                        <li>
                            <a href="https://stuffonharold.jhdees.com">Stuff On Harold</a>
                        </li>
                        <li>
                            <a href="https://github.com/jhdees/">GitHub</a>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav pull-right hide">
                        <li>
                            <img width="32" src={FacebookLogo} alt="Facebook Icon" />
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}
export default Jhdees;
