import {ADDWISH_LIST,REMOVEFROM_WISHLIST,REMOVE_ALL_ITEM_IN_WISHLIST,UPDATEQUALITY} from '../Action/ActionType';
const INITIAL_STATE={
    cart:[],
};
const AddWishReducer=(state=INITIAL_STATE,action)=>{
  console.log(action.id);
    let cart=state.cart;
        switch(action.type){    

            case ADDWISH_LIST:
              cart.push(action.playload);
                return {...state,cart:cart}

            case UPDATEQUALITY:
              let index;
              cart.map((item,key)=>{
                  if(item.data.product_id===action.id)
                  {
                      index=key;
                  }
              })
              cart[index].quality=action.quality;
              return {...state,cart:cart};

            case REMOVEFROM_WISHLIST:
                let abc=[];
                console.log("id is",action.id);    
              abc=cart.filter( item=>parseInt(item.data.product_id)!==parseInt(action.id));;
              console.log("abc is",abc);
              return{...state,cart:abc}

            case REMOVE_ALL_ITEM_IN_WISHLIST:
              let efg=[];
              return {...state,cart:efg}
            default:
                return state;
         }
}

export default AddWishReducer
