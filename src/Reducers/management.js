/**
 * Created by jasondees on 8/9/17.
 */
import { GO_TO_INDEX, Pages } from '../Actions/siteactions'
import _ from 'underscore';

let defaultActivePage = getInitialActivePage();

export default (state = {activePage: defaultActivePage}, action) =>{
    switch(action.type){
        case GO_TO_INDEX:
            return {activePage: action.page};
        default:
            return state;
    }
}

function getInitialActivePage(){
    var hash = window.location.hash.replace("#", ""); 
    if(_.contains(Pages, hash)){
        return hash;
    }
 
    return Pages[0];
}