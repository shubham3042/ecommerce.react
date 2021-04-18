import React,{useEffect,useState}from 'react'
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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {removeFromAddcart,updateQualityAdd,removecart,removewishlist,userid}from '../../Action/Action';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import {Route,Switch,Redirect, BrowserRouter} from 'react-router-dom';
import Checkout  from './Checkout';
import Header from '../../Componet/Header/Header';
function AddCart(props) {
    var total =0;
    const[loginAlert,setLoginAlert]=useState(false);
    const[check,setCheck]=useState(false);
    useEffect(()=>{
        props.userid(localStorage.getItem('user_id'));
        if(localStorage.getItem('user_id')===null)
        {
            props.removewishlist();
            props.removecart();
        }
    },[])
    const removecart=(id)=>{
        console.log("hello");
        if(localStorage.getItem('user_id')!==null)
        {
        props.removeFromAddcart(id);
        axios.post('http://secret-bastion-22485.herokuapp.com/deletecart',{
            user_id:localStorage.getItem('user_id'),
            product_id:id
        })
       }
       else
       {
            setLoginAlert(true);
               }
    }
    const onConfirm = () => {
        setLoginAlert(false);
        }

    const incremet=(id,quality)=>{
        props.updateQualityAdd(id,quality+1);
        axios.post('http://secret-bastion-22485.herokuapp.com/addcart/increment',{
            user_id:localStorage.getItem('user_id'),
            product_id:id,
            quantity:quality+1
        });
    }
    const card=(e)=>{
        e.preventDefault();  
        setCheck(true);
        localStorage.setItem('amount',total);
    }
    const decremet=(id,quality)=>{
        if(quality!==1)
        {
            props.updateQualityAdd(id,quality-1);
        }
       
    }
    return (
        <div style={{ marginTop: "79px" }}>
        {
            props.todo.AddToCartReducer.Addcart.length > 0 ?
                <form class="bg0 p-t-75 p-b-85">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-10 col-xl-7 m-lr-auto m-b-50">
                                <div class="m-l-25 m-r--38 m-lr-0-xl">
                                    <div class="wrap-table-shopping-cart">
                                        <table class="table-shopping-cart">
                                            <tr class="table_head">
                                                <th class="column-1">Product</th>
                                                <th class="column-2">Product Name</th>
                                                <th class="column-3">Price</th>
                                                <th class="column-4">Quantity</th>
                                                <th class="column-5">Total</th>
                                                <th class="column-7">Remove</th>
                                            </tr>
                                            {
                                           props.todo.AddToCartReducer.Addcart.map(item => {
                                               total+=parseInt(item.data.price)*parseInt(item.quality);
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
                                                            <div class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"  onClick={()=>decremet(item.data.product_id,item.quality)}>
                                                                <i class="fs-16 zmdi zmdi-minus"></i>
                                                            </div>

                                                            <input class="mtext-104 cl3 txt-center num-product" type="number" name="num-product1" value={item.quality} />

                                                            <div class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m" onClick={()=>incremet(item.data.product_id,item.quality)} >
                                                                <i class="fs-16 zmdi zmdi-plus"></i>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="column-5">{parseInt(item.data.price)*item.quality} $</td>
                                                    <td class="column-7"><p style={{cursor:'pointer'}} onClick={()=>removecart(item.data.product_id)}>Remove</p></td>
                                                </tr>})
                                            }
                                    </table>
                                    </div>         
                        </div>
                    </div>
                    <div class="col-sm-10 col-lg-7 col-xl-5 m-lr-auto m-b-50">
					<div class="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
						<h4 class="mtext-109 cl2 p-b-30">
							Cart Totals
						</h4>

						<div class="flex-w flex-t bor12 p-b-13">
							<div class="size-208">
								<span class="stext-110 cl2">
									Subtotal:
								</span>
							</div>

							<div class="size-209">
								<span class="mtext-110 cl2">
									${total}
								</span>
							</div>
						</div>

						<div class="flex-w flex-t bor12 p-t-15 p-b-30">
							<div class="size-208 w-full-ssm">
								<span class="stext-110 cl2">
									Shipping:
								</span>
							</div>

							<div class="size-209 p-r-18 p-r-0-sm w-full-ssm">
								<p class="stext-111 cl6 p-t-2">
									There are no shipping methods available. Please double check your address, or contact us if you need any help.
								</p>
								
								<div class="p-t-15">
									<span class="stext-112 cl8">
										Calculate Shipping
									</span>

									<div class="rs1-select2 rs2-select2 bor8 bg0 m-b-12 m-t-9">
										<select class="js-select2" name="time">
											<option>Select a country...</option>
											<option>USA</option>
											<option>UK</option>
										</select>
										<div class="dropDownSelect2"></div>
									</div>

									<div class="bor8 bg0 m-b-12">
										<input class="stext-111 cl8 plh3 size-111 p-lr-15" type="text" name="state" placeholder="State /  country" />
									</div>

									<div class="bor8 bg0 m-b-22">
										<input class="stext-111 cl8 plh3 size-111 p-lr-15" type="text" name="postcode" placeholder="Postcode / Zip" />
									</div>
									
									<div class="flex-w">
										<div class="flex-c-m stext-101 cl2 size-115 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer">
											Update Totals
										</div>
									</div>
										
								</div>
							</div>
						</div>

						<div class="flex-w flex-t p-t-27 p-b-33">
							<div class="size-208">
								<span class="mtext-101 cl2">
									Total:
								</span>
							</div>

							<div class="size-209 p-t-1">
								<span class="mtext-110 cl2">
                                  ${total}
								</span>
							</div>
						</div>

						<button class="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer" onClick={card}>
							Proceed to Checkout
						</button>
					</div>
				</div>
                {
				loginAlert===true ?
				<SweetAlert title="You Need to Login First!" onConfirm={onConfirm} />
				:null
		    	}
                {
                    check===true ?
                            <Redirect from="/addcart" to="/checkout" />
                    :null
                }
		</div>
        </div>
                </form>
:<h1>Cart Is Empty</h1>
        }
    </div>
    )
}
const mapStateToProps = state => {
    return {
        todo: state,
        //   cartUpdated: () => { return true }
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        removeFromAddcart,
        updateQualityAdd,removecart,removewishlist,
        userid
    }, dispatch)
	
  }
export default connect(mapStateToProps,mapDispatchToProps)(AddCart)
