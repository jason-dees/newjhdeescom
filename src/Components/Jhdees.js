import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import '../Styles/Jhdees.css';
import FacebookLogo from '../Images/facebook.png';
import Card from '../Components/Section/Card.js';


class Jhdees extends Component {
    static propTypes = {
        activeIndex: PropTypes.number
    };
    render() {
        const { activeIndex } = this.props;
        console.log(this.props);
        //use redux for which section is active when;
        return (
            <div className="App">
                <JhdeesMenu>
                </JhdeesMenu>
                { activeIndex == 0 &&
                <Card />
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    const  activeIndex  = state.index;

    return { activeIndex };
};

class JhdeesMenu extends Component{
    render() {
        return (
            <div>
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
            </div>
        );
    }
}

export default connect(mapStateToProps)(Jhdees);
