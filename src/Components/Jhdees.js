import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import '../Styles/Jhdees.css';
import FacebookLogo from '../Images/facebook.png';
import Card from './Section/Card.js';
import Image from './Section/Image.js';
import Doc from './Section/Doc.js';
import {goToIndex} from '../Actions/siteactions.js'
import '../bootstrap/css/bootstrap.min.css';

class Jhdees extends Component {
    static propTypes = {
        activeIndex: PropTypes.number.isRequired,
        dispatch: PropTypes.func.isRequired
    };
    render() {
        const { activeIndex, dispatch } = this.props;
        //use redux for which section is active when;
        let menuItems = ["My Card", "Doc", "Image"];
        let sections = [<Card />, <Doc />, <Image />];
        return (
            <div className="Jhdees">
                <JhdeesMenu dispatch={dispatch} activeIndex={activeIndex} menuItems={menuItems} />
                {sections[activeIndex]}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { activeIndex } = state;

    return { activeIndex };
};

class JhdeesMenu extends Component{
    static propTypes = {
        activeIndex: PropTypes.number,
        menuItems: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    goTo(index){
        const {dispatch} = this.props;
        dispatch(goToIndex(index));
    }

    render() {
        const { menuItems, activeIndex} = this.props;
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
                           <li key={item} className={activeIndex === index ? "active": ""}>
                               <a onClick={this.goTo.bind(this, index)}>{item}</a>
                           </li>)
                        }
                        <li>
                            <a href="https://recipes.jhdees.com">Recieps</a>
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
