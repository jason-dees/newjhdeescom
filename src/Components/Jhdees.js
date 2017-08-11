import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import '../Styles/Jhdees.css';
import FacebookLogo from '../Images/facebook.png';
import Card from '../Components/Section/Card.js';
import {goToIndex} from '../Actions/siteactions.js'

class Jhdees extends Component {
    static propTypes = {
        activeIndex: PropTypes.number.isRequired,
        dispatch: PropTypes.func.isRequired
    };
    render() {
        const { activeIndex, dispatch } = this.props;
        //use redux for which section is active when;
        let menuItems = ["My Card", "Doc", "Image"];
        let sections = [<Card />,'',''];
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
                           <li key={item}>
                               <a onClick={this.goTo.bind(this, index)}>{item}</a>
                           </li>)
                        }
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
            </div>
        );
    }
}
export default connect(mapStateToProps)(Jhdees);
