/**
 * Created by jasondees on 8/13/17.
 */
import React, { Component } from 'react';
import Section from '../Section.js';
import DocumentEditor from '../../Library/DocumentEditor.js';

class Doc extends Component {
    componentDidMount(){
        let editor = new DocumentEditor('#doc_container');
        editor.setNewButton('#NewButton');
        editor.setIdInput('#DocId');
    }

    render() {
        return (
            <Section>
                <div className="form-inline">
                    <div className="form-group">
                        <label className="sr-only" htmlFor="DocId">Document Id</label>
                        <input type="text" id="DocId" className="form-control" placeholder="Document Id" defaultValue="1"/>
                    </div>
                    <button className="btn has-tooltip btn-default" title="New Document" id="NewButton">
                        <i className="glyphicon glyphicon-file" />
                    </button>
                    <a href="" className="btn btn-link has-tooltip" title="Link to Doc" id="LinkButton">
                        <i className="glyphicon glyphicon-share"/>
                    </a>
                </div>
                <br/>
                <textarea className="col-lg-12 well well-small" id="doc_container" style={{height:"200px"}} defaultValue="
                    Broke as my cat's lil boy parts right now while i migrate away from php and rebuild the back end

                    I made this document sharing thing. You and any number of people (I have only tested with myself using Chrome and myself using FireFox at the same time) and you can see what they are typing with a 1 + latency second delay.

                    You just need to give whoever you want to share stuff with the number in that box. You can create new documents with that new document button.

                    This isn't actually a real document so you can't mess this up for everyone.

                    Known bugs:
                    - New lines get erased on save unless you are quick like lightning and just type something
                    - There's a random bug where sometimes the last changes are unable to be gone."
                />
            </Section>
        );
    }
}

export default Doc;