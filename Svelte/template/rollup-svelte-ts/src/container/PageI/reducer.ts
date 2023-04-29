import { actionType } from ".";

const initialState = {
    a:10,
    b:20
  };
  
const reducer = (state = initialState, action) => {
    const {
        CHANGE_SOME
    } = actionType
    console.log(state)
    switch (action.type) {
        case CHANGE_SOME: 
            return { ...state, a:action.val };
        default: return state;
    }
};

export default reducer

