import {USER_ID,USER_REMOVE} from '../Action/ActionType';
import React from 'react'

const INITIAL_STATE={
    user_id:null,
};
const UserReducer=(state=INITIAL_STATE,action)=>{
    console.log("USERREDUCERCALLED",action.type);
    switch(action.type){    

        case USER_ID:   
            return{
                ...state,user_id:action.id
            }
        case USER_REMOVE:
            console.log("remover use called");
            return{
                ...state,user_id:null
            }
            default:
                return state;
}
}
export default UserReducer