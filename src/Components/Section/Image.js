import React, { Component } from 'react';
import Section from '../Section.js';
import '../../Styles/Image.css';
import ImageTest from '../../Library/ImageTest.js';

class Image extends Component {
   componentDidMount(){
        new ImageTest();
   }
   render() {
       return (
           <Section>
               <div id="ImageTest"/>
           </Section>
       );
   }
}

export default Image;
