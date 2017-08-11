/**
 * Created by jasondees on 8/9/17.
 */
import { GO_TO_INDEX } from '../Actions/siteactions'

export default (state = {activeIndex: 0}, action) =>{
    switch(action.type){
        case GO_TO_INDEX:
            return {activeIndex: action.index};
        default:
            return state;
    }
}
