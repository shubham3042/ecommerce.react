import {ADDWISH_LIST,
    REMOVEFROM_ADDCART,
    UPDATEQUALITY_CART,
    REMOVE_ALL_ITEM_IN_WISHLIST,
    UPDATEQUALITY,
    REMOVEFROM_WISHLIST,
    ADD_TO_CARD,
    USER_ID,
    USER_REMOVE,REMOVE_ALL_ITEM_IN_CART } from './ActionType';
export const addwish=(data)=>{
    console.log("addwish called");
    return{
        type:ADDWISH_LIST,
        playload:{
        data:data,
        quality:1
        }
    }
}
export const updateQuality=(id,quality)=>{
     console.log("method called", id,quality);
        return{
            type:UPDATEQUALITY,
            id:id,
            quality:quality
        }
}  
export const removefromWishlist=(id)=>{
    return{
        type:REMOVEFROM_WISHLIST,
        id:id
    }
} 
export const removeFromAddcart=(id)=>{
    return{
        type:REMOVEFROM_ADDCART,
        id:id
    }
}
export const addtocard=(data,quality)=>{
    return{
        type:ADD_TO_CARD,
        playload:{
        data:data,
        quality:quality
        }
    }
}
export const updateQualityAdd=(id,quality)=>{
    console.log("method called", id,quality);
       return{
           type:UPDATEQUALITY_CART,
           id:id,
           quality:quality
       }
} 
export const removewishlist=()=>{
    console.log("helloe1323");
    return{
        type:REMOVE_ALL_ITEM_IN_WISHLIST
    }
}
export const userid=(id)=>{
    return({
        type:USER_ID,
        id:id
    })
}
export const removeuser=()=>{
    return({
        type:USER_REMOVE
    })
}
export const removecart=()=>{
    return {
        type:REMOVE_ALL_ITEM_IN_CART
    }
}