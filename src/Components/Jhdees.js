import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import '../Styles/Jhdees.css';
import FacebookLogo from '../Images/facebook.png';
import Card from './Section/Card.js';
import Image from './Section/Image.js';
import Doc from './Section/Doc.js';
import {goToIndex, Pages} from '../Actions/siteactions.js'
import _ from 'underscore';
import '../bootstrap/css/bootstrap.min.css';

class Jhdees extends Component {
    static propTypes = {
        activePage: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    render() {
        const { activePage, dispatch } = this.props;

        let sections = [<Card />, <Doc />, <Image />];

        return (
            <div className="Jhdees">
                <JhdeesMenu dispatch={dispatch} activePage={activePage} menuItems={Pages} />
                {sections[_.indexOf(Pages,activePage)]}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { activePage } = state;

    return { activePage };
};

class JhdeesMenu extends Component{
    static propTypes = {
        activePage: PropTypes.string,
        menuItems: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    goTo(index){
        const {dispatch} = this.props;
        dispatch(goToIndex(index));
    }

    render() {
        const { menuItems, activePage} = this.props;
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
                           <li key={item} className={activePage === item ? "active": ""}>
                               <a onClick={this.goTo.bind(this, item)} href={"#" + item}>{item}</a>
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
export default connect(mapStateToProps)(Jhdees);
