import React, { Component } from 'react';

class Section extends  Component {
    render() {
        return (
            <div>
                Here is a section
                <br/>
                {this.props.children}
            </div>
        );
    }
}

export default Section;