/**
 * Created by jasondees on 8/13/17.
 */
import React, { Component } from 'react';
import Section from '../Section.js';
import DocumentEditor from '../../Library/DocumentEditor.js';
import { Link } from 'react-router-dom'

class Doc extends Component {
    constructor(){
        super();

        let editor = new DocumentEditor();
        this.state = {
            editor
        };
    }
    componentDidMount(){
        let { docId } = this.props.match.params;

        if(docId === undefined || docId === '' + docId === null){
            docId = 1;
        }

        this.setEditorId(docId);
    }

    inputIdValueChange(e){
        var inputValue = e.currentTarget.value;

        this.setEditorId(inputValue);
    }

    inputTextValueChange(e){
        let { editor } = this.state;
        var inputValue = e.currentTarget.value;

        editor.current(inputValue);
        this.setState({docWords: editor.currentWords});
    }

    setEditorId(id){
        let { editor } = this.state;

        editor.setId(id);
        this.setState({docId: editor.Id});
    }

    newEditor(e){
        let { editor } = this.state;
        editor.newWords();
    }

    render() {
        let { editor } = this.state;

        editor.setIdInput('#DocId');

        return (
            <Section>
                <div className="form-inline">
                    <div className="form-group">
                        <label className="sr-only" htmlFor="DocId">Document Id</label>
                        <input type="text" id="DocId" className="form-control" placeholder="Document Id" 
                            value={editor.Id} onChange={this.inputIdValueChange.bind(this)} />
                    </div>
                    <button className="btn has-tooltip btn-default" title="New Document" onClick={this.newEditor.bind(this)}>
                        <i className="glyphicon glyphicon-file" />
                    </button>
                    <Link to={"/doc/" + editor.Id}><i className="glyphicon glyphicon-share"/></Link> 
                </div>
                <br/>
                <textarea className="col-lg-12 well well-small" id="doc_container" 
                    style={{height:"200px"}} value={editor.currentWords}
                    onChange={this.inputTextValueChange.bind(this)}
                    />
            </Section>
        );
    }
}

export default Doc;