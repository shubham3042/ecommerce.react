import React from 'react'
import {ADD_TO_CARD,REMOVEFROM_ADDCART,UPDATEQUALITY_CART,REMOVE_ALL_ITEM_IN_CART} from '../Action/ActionType';
const INITIAL_STATE={
    Addcart:[],
};
const AddToCartReducer=(state=INITIAL_STATE,action)=>{
    let cart=state.Addcart;
        switch(action.type){    
            case ADD_TO_CARD:
            cart.push(action.playload);
                return {...state,Addcart:cart}
            case REMOVEFROM_ADDCART:
               let abc=[];
              abc=cart.filter( item=> item.data.product_id!==action.id);
              console.log("abc is",abc);
              return{...state,Addcart:abc}
            case UPDATEQUALITY_CART:
              let index;
              cart.map((item,key)=>{
                  if(item.data.product_id===action.id)
                  {
                      index=key;
                  }
              })
              cart[index].quality=action.quality;
              return{...state,Addcart:cart}
              
              case REMOVE_ALL_ITEM_IN_CART:
              let efg=[];
              return {...state,Addcart:efg}

            default:
                 return state;
        }
}
export default AddToCartReducer;