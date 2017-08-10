/**
 * Created by jasondees on 8/9/17.
 */
import { CARD_ACTIVE, DOC_ACTIVE, IMAGE_ACTIVE, GO_TO_INDEX } from '../Actions/siteactions'

export function goToIndex(index){
    return {
        type : GO_TO_INDEX,
        index
    }
}

export default (state = goToIndex(0), action) =>{
    console.log(state);
    switch(action.type){
        case GO_TO_INDEX:
            return {...state, ...goToIndex(action.index)};
        default:
            return state;
    }
}