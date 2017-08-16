/**
 * Created by jasondees on 8/13/17.
 */
import React, { Component } from 'react';
import Section from '../Section.js';

class Doc extends Component {
    render() {
        return (
            <Section>
                <div className="form-inline">
                    <div className="form-group">
                        <label className="sr-only" for="DocId">Document Id</label>
                        <input type="text" id="DocId" value="1" className="form-control" placeholder="Document Id"/>
                    </div>
                    <button className="btn has-tooltip btn-default" title="New Document" id="NewButton">
                        <i className="glyphicon glyphicon-file" />
                    </button>
                    <a href="" className="btn btn-link has-tooltip" title="Link to Doc" id="LinkButton">
                        <i class="glyphicon glyphicon-share"/>
                    </a>
                </div>
                <br/>
                <textarea className="col-lg-12 well well-small" id="doc_container" style={{height:"200px"}}>
                    I made this document sharing thing. You and any number of people (I have only tested with myself using Chrome and myself using FireFox at the same time) and you can see what they are typing with a 1 + latency second delay.

                    You just need to give whoever you want to share stuff with the number in that box. You can create new documents with that new document button.

                    This isn't actually a real document so you can't mess this up for everyone.

                    Known bugs:
                    - New lines get erased on save unless you are quick like lightning and just type something
                    - There's a random bug where sometimes the last changes are unable to be gone.
                </textarea>
            </Section>
        );
    }
}

export default Doc;