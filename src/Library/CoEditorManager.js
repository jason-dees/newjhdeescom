import CoEditor from './CoEditorLib.js';

export const GET_DOCUMENT = 'GET_DOCUMENT';
export const RECIEVE_DOCUMENT = 'RECIEVE_DOCUMENT';
export const WAITING = 'WAITING';
export const NEW_DOCUMENT = 'NEW_DOCUMENT';
export const SEND_DOCUMENT = 'SEND_DOCUMENT';

let editor = new CoEditor();

let manager = (state = { docId: -1, words: '', newWords: '' }, action) => {
    console.log(action);
    switch(action.type){
        case GET_DOCUMENT:
            return {
                ...state
            };
        case RECIEVE_DOCUMENT:
            return {
                ...action
            }
        case NEW_DOCUMENT:
            return;
        case SEND_DOCUMENT:
            return {
                ...action
            }
        default:
            return state;
    }
}

export default manager ;

export const getDocument = (docId) => dispatch => {
    dispatch({type: WAITING});

    return editor.SetId(docId).then(() => {
        dispatch({
            type: RECIEVE_DOCUMENT,
            docId: docId,
            words: editor.LatestWords
        });
    });
};

export const newDocument = () => {};

export const recievedDocument = () => {}; 

export const sendDocument = (newWords) => dispatch => {
    dispatch({type: WAITING});

    return editor.SetLatestWords(newWords).then(() => {
        dispatch({
            type: RECIEVE_DOCUMENT,
            words: editor.LatestWords
        });
    });
}; 