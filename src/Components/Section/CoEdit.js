/**
 * Created by jasondees on 8/13/17.
 */
import React, { Component } from 'react';
import Section from '../Section.js';
import { Link } from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import manager, { getDocument, sendDocument} from'../../Library/CoEditorManager.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import thunk from 'redux-thunk';

const middleware = [ thunk ];

const coeditStore = createStore(manager, {
    words: 'not yet gotten'
    },
    applyMiddleware(...middleware)
);

class CoEdit extends Component {
    render() {
        let { docId } = this.props.match.params;

        if(docId === undefined || docId === '' + docId === null){
            docId = 1;
        }

        return (
            <Provider store={coeditStore}>
                <ConnectedCoEditInner docId={Number(docId)}/>
            </Provider>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

class CoEditInner extends Component {
    static propTypes = {
        docId: PropTypes.number,
        words: PropTypes.string,
        dispatch: PropTypes.func.isRequired
    };

    componentDidMount(){
        const { dispatch, docId } = this.props;
        dispatch(getDocument(docId));
    }

    inputTextValueChange(e){
        const { dispatch } = this.props;

        var inputValue = e.currentTarget.value;

        dispatch(sendDocument(inputValue));
    }

    render() {
        const { docId, words } = this.props;
        return (
            <Section>
                <div className="form-inline">
                    <div className="form-group">
                        <label className="sr-only">Document Id</label>
                        <input type="text"className="form-control" placeholder="Document Id" 
                            defaultValue={docId}/>
                    </div>
                    <button className="btn has-tooltip btn-default" title="New Document">

                        <i className="glyphicon glyphicon-file" />
                    </button>
                    <Link to={"/coeditor/" + docId}><i className="glyphicon glyphicon-share"/></Link> 
                </div>
                <br/>
                <textarea className="col-lg-12 well well-small" id="doc_container" 
                    style={{height:"200px"}} onChange={this.inputTextValueChange.bind(this)} value={words}
                    />
            </Section>
        ); 
    }
}

const ConnectedCoEditInner = connect(mapStateToProps)(CoEditInner);

export default CoEdit;