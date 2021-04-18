import React, { useEffect, useState } from 'react'
import '../../vendor/bootstrap/css/bootstrap.min.css';
import '../../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../../fonts/iconic/css/material-design-iconic-font.min.css';
import '../../fonts/linearicons-v1.0.0/icon-font.min.css';
import '../../css/util.css';
import '../../css/main.css';
import {addwish,addtocard,removefromWishlist}from '../../Action/Action'
import { connect } from 'react-redux';
import {mapState} from '../Header/Header';
import { bindActionCreators } from 'redux';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import image2 from '../../images/icons/icon-heart-01.png';
import image3 from '../../images/icons/icon-heart-02.png';
import { makeStyles } from '@material-ui/core/styles';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
let ans;
var item_addcart=false;
function Card(props) {
	const obj={
		name:props.name,
		price:props.price,
		imageURl:props.image1,
		product_id:props.product_id
	}
	const [name,setName]=useState('');
	const [displayAlert, setDisplayAlert] = useState(false);
	const[displaybtn,setDisplaybtn]=useState([]);
	const[flag,setFlag]=useState(false);
	const[loginAlert,setLoginAlert]=useState(false);
	const[cartAlert,setCartAlert]=useState(false);
	const[displayCartAlert,setDisplayCartAlert]=useState(false);
	const[productDetailId,setProductDetailedId]=useState(0);
	const addWish=(e)=>{
		e.preventDefault();
		setName(obj.name);
		if(localStorage.getItem('user_id')!==null)
		{
			props.addwish(obj);
			setDisplayAlert(true);
			axios.post('http://secret-bastion-22485.herokuapp.com/addwish',{
				user_id:localStorage.getItem('user_id'),
				product_id:props.product_id
			})
		}
		else
		{
			setLoginAlert(true);
		}
	}
	const addcard1=(id,quality)=>{
        console.log("flag",item_addcart);
        console.log("id is",id);
		setName(obj.name);
		if(localStorage.getItem('user_id')!==null)
		{
       if(props.todo.AddToCartReducer.Addcart.length > 0)
       {
        props.todo.AddToCartReducer.Addcart.forEach(item => {
                if(parseInt(item.data.product_id)===id)
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
            props.addtocard(obj,quality);      
			setDisplayCartAlert(true);
			axios.post('http://secret-bastion-22485.herokuapp.com/addcart',{
			user_id:localStorage.getItem('user_id'),
			product:obj,
			quantity:1
		})
        }
      }	
      else
      {
        props.addtocard(obj,quality);
		axios.post('http://secret-bastion-22485.herokuapp.com/addcart',{
			user_id:localStorage.getItem('user_id'),
			product:obj,
			quantity:1
		})
		setDisplayCartAlert(true);
	}

      }
	  else
	  {
		  setLoginAlert(true);
	  }
      item_addcart=false
    }
	//console.log(props.todo)
	const onConfirm = () => {
        setDisplayAlert(false);
		setLoginAlert(false);
		setCartAlert(false);
		setDisplayCartAlert(false);
		//console.log(props.todo)
		//console.log(displaybtn);
    }
	const removeWish=(id)=>{
		console.log(id);
			props.removefromWishlist(id);
			axios.post('http://secret-bastion-22485.herokuapp.com/deletewish',{
				user_id:localStorage.getItem('user_id'),
				product_id:id
			})
	}
	const productDetail=(id)=>{
		setProductDetailedId(id);
		console.log(id);
	}
	// const shubham=()=>{
	// 	setHeaderLocal(d);
	// 	//cons
	// 	console.log(headerLocal);
	// }
	return (	
<div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women" >
	{
			productDetailId!==0 ?
			<Redirect from="/products" to={`/product-details/${productDetailId}`} />
		  :null
	}
			<div class="block2 hov-img0">
				<img src={`http://secret-bastion-22485.herokuapp.com/uploads/${props.image1}`} style={{cursor:"pointer"}} alt="IMG-PRODUCT" onClick={()=>productDetail(props.product_id)} />
			</div>
			<div class="block2-txt flex-w flex-t p-t-14">
				<div class="block2-txt-child1 flex-col-l ">
					<p onClick={()=>productDetail(props.product_id)} style={{cursor:"pointer"}} class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
						{props.name}
					</p>

					<span class="stext-105 cl3">
						{props.price} $
					</span>
				</div>
				<div class="block2-txt-child2 flex-r ">
					<span style={{ cursor: "pointer"}}><AddShoppingCartIcon onClick={()=>addcard1(props.product_id,1)}/></span>						
									{
										props.todo.AddWishReducer.cart.length>0 ?
										props.todo.AddWishReducer.cart.map(item=>{
											console.log(item);
												if(parseInt(item.data.product_id)===props.product_id)
												{
													console.log("its matched");
													ans=item.data.product_id;
												}
											
											})
										:
										<button class="dis-block pos-relative" onClick={addWish}>
												<img style={{marginRight:"15px"}} class="icon-heart1 dis-block" src={image2} alt="ICON" />				
										 </button>
									}
									{
								
											ans!==undefined ?	
											<button class="dis-block pos-relative" onClick={()=>removeWish(props.product_id)}>
											<img style={{marginRight:"15px"}}  class="icon-heart2 dis-block" src={image3} alt="ICON" />					
										    </button>
										   	:
											ans===undefined && props.todo.AddWishReducer.cart.length>0 ?
											   <button class="dis-block pos-relative" onClick={addWish}>
												   <img style={{marginRight:"15px"}}  class="icon-heart1 dis-block" src={image2} alt="ICON" />				
										         </button>
											//  displaybtn.lengh!==0 ?
											//    <button class="dis-block pos-relative" onClick={addWish}>
											// 		   <img class="icon-heart1 dis-block" src={image2} alt="ICON" />				
											// 	</button>
											// :
											//null
											:null
										   
									}
									{
										ans=undefined
                                        }		
				</div>
			</div>
			{ displayAlert === true ?
                <SweetAlert success title={name} onConfirm={onConfirm} >
                    is added to wishlist !
                 </SweetAlert>
                : null
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
			</div >	
    )
}
 const mapStateToProps = state => {
	return {
	   todo: state,
	 };
   };
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
     addwish,
	 addtocard,
	 removefromWishlist
    }, dispatch)
	
  }
export default connect(mapStateToProps,mapDispatchToProps)(Card);

//export default Card;