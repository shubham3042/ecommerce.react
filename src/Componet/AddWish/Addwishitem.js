import React,{useState,useEffect}from 'react'
import { connect } from 'react-redux';
import {updateQuality,removefromWishlist,addtocard,userid,removecart,removewishlist} from '../../Action/Action';
import { bindActionCreators } from 'redux';
import '../../vendor/bootstrap/css/bootstrap.min.css';
import '../../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../../fonts/iconic/css/material-design-iconic-font.min.css';
import '../../fonts/linearicons-v1.0.0/icon-font.min.css';
// import '../../vendor/animate/animate.css';
import '../../vendor/css-hamburgers/hamburgers.min.css';
// import '../../vendor/animsition/css/animsition.min.css';
import '../../vendor/select2/select2.min.css';
import '../../vendor/daterangepicker/daterangepicker.css';
import '../../vendor/slick/slick.css';
import '../../vendor/MagnificPopup/magnific-popup.css';
import '../../vendor/perfect-scrollbar/perfect-scrollbar.css';
import '../../css/util.css';
import '../../css/main.css';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';

var item_addcart=false;
let anames;
function Addwishitem(props) {
  //  console.log(props.todo.AddWishReducer.cart.length);
    const[localData,setLocalData]=useState([]);
    const[displayCartAlert,setDisplayCartAlert]=useState(false);
    const[cartAlert,setCartAlert]=useState(false);
    const [name,setName]=useState('');
    const[loginAlert,setLoginAlert]=useState(false);
    const incremet=(id,quality)=>{
        console.log(id);
        props.updateQuality(id,quality+1);
    }
    const decremet=(id,quality)=>{
        if(quality!==1)
        {
            props.updateQuality(id,quality-1);
        }
       
    }
    const onConfirm = () => {
    setDisplayCartAlert(false);
    setCartAlert(false);
    setLoginAlert(false);
    }
    const removewish=(id)=>{
    if(localStorage.getItem('user_id')!==null)
    {
     props.removefromWishlist(id);
       console.log(id);
       axios.post('http://secret-bastion-22485.herokuapp.com/deletewish',{
				user_id:localStorage.getItem('user_id'),
				product_id:id
			})
    }
    else
    {
        setLoginAlert(true);
    }
    }
    useEffect(()=>{
        props.userid(localStorage.getItem('user_id'));
        if(localStorage.getItem('user_id')===null)
        {
            props.removewishlist();
            props.removecart();
        }
    },[])
    const addcard1=(product,id,quality)=>{
        if(localStorage.getItem('user_id')!==null)
        {
        console.log("flag",item_addcart);
        console.log("id is",id);
        setName(product.data.name);
       if(props.todo.AddToCartReducer.Addcart.length > 0 )
       {
        props.todo.AddToCartReducer.Addcart.forEach(item => {
           
                if(item.data.product_id===id)
                {
                    console.log("its matched");
                    item_addcart=true;
                    
                }
        })
        if(item_addcart)
        {
           setCartAlert(true);
        }
        else{
            
            props.addtocard(product.data,quality);
            setDisplayCartAlert(true);
        }
      }
      else
      {
        props.addtocard(product.data,quality);
        setDisplayCartAlert(true);
      }
      item_addcart=false
    }
    else
    {
        setLoginAlert(true);
    }
}
    return (
        <div style={{marginTop:'80px'}}>
            {
                props.todo.AddWishReducer.cart.length > 0 ?
                    <form class="bg0 p-t-75 p-b-85">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-10 col-xl-10 m-lr-auto m-b-50">
                                    <div class="m-l-25 m-r--38 m-lr-0-xl">
                                        <div class="wrap-table-shopping-cart">
                                            <table class="table-shopping-cart">
                                                <tr class="table_head">
                                                    <th class="column-1">Product</th>
                                                    <th class="column-2">Product Name</th>
                                                    <th class="column-3">Price</th>
                                                    <th class="column-4">Quantity</th>
                                                    <th class="column-5">Total</th>
                                                    <th class="column-6">Add TO CART</th>
                                                    <th class="column-7">Remove</th>
                                                </tr>
                                                {
                                                props.todo.AddWishReducer.cart.map(item => {
                                                    return <tr class="table_row">
                                                        <td class="column-1">
                                                            <div class="how-itemcart1">
                                                                <img src={`http://secret-bastion-22485.herokuapp.com/uploads/${item.data.imageURl}`} alt="IMG" />
                                                            </div>
                                                        </td>
                                                        <td class="column-2">{item.data.name}</td>
                                                        <td class="column-3">{item.data.price}</td>
                                                        <td class="column-4">
                                                            <div class="wrap-num-product flex-w m-l-auto m-r-0">
                                                                <div class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m" onClick={()=>decremet(item.data.product_id,item.quality)}>
                                                                    <i class="fs-16 zmdi zmdi-minus"></i>
                                                                </div>

                                                                <input class="mtext-104 cl3 txt-center num-product" type="number" name="num-product1" value={item.quality} />

                                                                <div class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"  onClick={()=>incremet(item.data.product_id,item.quality)}>
                                                                    <i class="fs-16 zmdi zmdi-plus"></i>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td class="column-5">{parseInt(item.data.price)*item.quality} $</td>
                                                        <td class="column-6" ><p style={{cursor:"pointer"}}  onClick={()=>addcard1(item,item.data.product_id,item.quality)}>Add To CART</p></td>
                                                        <td class="column-7"><p style={{cursor:'pointer'}} onClick={()=>removewish(item.data.product_id)}>Remove</p></td>
                                                    </tr>})
                                                }
                                        </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
				cartAlert===true ?
				<SweetAlert
						warning
						confirmBtnText="okk"
						confirmBtnBsStyle="danger"
						title="Item is Already in Cart"
						onConfirm={onConfirm}
						focusCancelBtn
						>
						
						</SweetAlert>
				:null
			}
            { displayCartAlert === true ?
                <SweetAlert success title={name} onConfirm={onConfirm} >
                    is added to Cart !
                 </SweetAlert>
                : null
            }
            	{
				loginAlert===true ?
				<SweetAlert title="You Need to Login First!" onConfirm={onConfirm} />
				:null
			}
                    </form>
    :<h1>WishList Is Empty</h1>
            }
        </div>
    )
}
const mapStateToProps = state => {
    console.log("chech",state);
    return {
        todo: state,
        //   cartUpdated: () => { return true }
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
     updateQuality,
     removefromWishlist,
     addtocard,
     userid,
     removecart,
     removewishlist
    }, dispatch)
	
  }
export default connect(mapStateToProps,mapDispatchToProps)(Addwishitem)
