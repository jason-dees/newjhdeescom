import React, { Component } from 'react';

class Section extends  Component {
    render() {
        return (
            <div className="Section">
                {this.props.children}
            </div>
        );
    }
}

export default Section;