import React,{useState,useEffect} from 'react';
import '../../vendor/bootstrap/css/bootstrap.min.css';
import '../../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../../fonts/iconic/css/material-design-iconic-font.min.css';
import '../../fonts/linearicons-v1.0.0/icon-font.min.css';
import '../../css/util.css';
import '../../css/main.css';
import  {useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addtocard}from '../../Action/Action'
import SweetAlert from 'react-bootstrap-sweetalert';

import axios from 'axios';
let obj;
var item_addcart=false;
const Product =(props)=>{
	let {id}= useParams();
	const[tab,setTab]=useState('tab1');
	const[data,setData]=useState([]);
	const[count,setCount]=useState(1);
	const[loginAlert,setLoginAlert]=useState(false);
	const[cartAlert,setCartAlert]=useState(false);
	const[displayCartAlert,setDisplayCartAlert]=useState(false);
	const[rate,setRate]=useState([]);
	const [displayrate,setDisplayRate]=useState(false);
	const [review,setReview]=useState('');
	const [dataReview,setDataReview]=useState([]);
	useEffect(async() => {  
		const ans=await axios.get(`http://secret-bastion-22485.herokuapp.com/${id}`);
		setData(ans.data);
		console.log(ans.data);
		obj={name:ans.data.productname,product_id:ans.data.product_id,imageURl:ans.data.product_image,price:ans.data.product_price};
		console.log(obj);
	},[dataReview])
const incremet=(e)=>{
	e.preventDefault();
	setCount(count+1);
}
const decrement=(e)=>{
	e.preventDefault();
	if(count>1)
	{
		setCount(count-1);
	}
}
const rating =(i)=>{
 let a= Array(i).fill(0);
  setRate(a);
 setDisplayRate(true);
}	
const onTabChange=async(id1)=>{
		if(id1===2)
		{
			console.log("its called");
			setTab('tab2');
		}
		if(id1===3)
		{
			setTab('tab3');
			console.log(id);
		const ans=await	axios.get(`http://secret-bastion-22485.herokuapp.com/getReview/${id}`);
		console.log("tab",ans.data);
		setDataReview(ans.data);
		}
		if(id1===1)
		{
			setTab('tab1');
		}
	}
	const reviewsubmit=async(e)=>{
		e.preventDefault();
	const ans=await axios.post('http://secret-bastion-22485.herokuapp.com/review',{
			
				user_id:localStorage.getItem('user_id'),
				product_id:id,
				rate:rate.length,
				review:review,
				fullname:localStorage.getItem('name')
			
		});
		console.log(ans.data);
		let l1=dataReview;
		const obj={
			user_id:ans.data.user_id,
			id:ans.data.id,
			product_id:ans.data.product_id,
			rate:ans.data.rate,
			review:ans.data.review,
			fullname:ans.data.fullname

		}
		console.log(obj);
		l1.push(obj)
		setDataReview(l1);
		onTabChange(3);

	}
	const addcard1=(e)=>{
		e.preventDefault();
        if(localStorage.getItem('user_id')!==null)
        {
        console.log("flag",item_addcart);
       // console.log("id is",id);
       //x setName(product.data.name);
       if(props.todo.AddToCartReducer.Addcart.length > 0 )
       {
        props.todo.AddToCartReducer.Addcart.forEach(item => {
           
                if(parseInt(item.data.product_id)===obj.product_id)
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
            
            props.addtocard(obj,count);
            setDisplayCartAlert(true);
        }
      }
      else
      {
		props.addtocard(obj,count);
        setDisplayCartAlert(true);
      }
      item_addcart=false
    }
    else
    {
        setLoginAlert(true);
    }
}
const onConfirm = () => {
	setLoginAlert(false);
	setCartAlert(false);
	setDisplayCartAlert(false);
	//console.log(props.todo)
	//console.log(displaybtn);
}
	return(
           <div style={{marginTop:'80px'}}>
               	<section class="sec-product-detail bg0 p-t-65 p-b-60">
		<div class="container">
			<div class="row">
				<div class="col-md-6 col-lg-7 p-b-30">
					<div class="p-l-25 p-r-30 p-lr-0-lg">
						<div class="wrap-slick3 flex-sb flex-w">
							<div class="wrap-slick3-dots"></div>
							<div class="wrap-slick3-arrows flex-sb-m flex-w"></div>

							<div class="slick3 gallery-lb">
								<div class="item-slick3" data-thumb="images/product-detail-01.jpg">
									<div class="wrap-pic-w pos-relative">
										<img src={`http://secret-bastion-22485.herokuapp.com/uploads/${data.product_image}`} alt="IMG-PRODUCT" />

										<a class="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" href={`http://localhost:8000/uploads/${data.product_image}`}>
											<i class="fa fa-expand"></i>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
					
				<div class="col-md-6 col-lg-5 p-b-30">
					<div class="p-r-50 p-t-5 p-lr-0-lg">
						<h4 class="mtext-105 cl2 js-name-detail p-b-14">
							{data.productname}
						</h4>

						<span class="mtext-106 cl2">
							<strong>${data.product_price}</strong>
						</span>

						<p class="stext-102 cl3 p-t-23">
							Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.
						</p>
						
				
						<div class="p-t-33">
							<div class="flex-w flex-r-m p-b-10">
								<div class="size-203 flex-c-m respon6">
									Size
								</div>

								<div class="size-204 respon6-next">
									<div class="rs1-select2 bor8 bg0">
										<select class="js-select2" name="time">
											<option>Choose an option</option>
											<option>Size S</option>
											<option>Size M</option>
											<option>Size L</option>
											<option>Size XL</option>
										</select>
										<div class="dropDownSelect2"></div>
									</div>
								</div>
							</div>

							<div class="flex-w flex-r-m p-b-10">
								<div class="size-203 flex-c-m respon6">
									Color
								</div>

								<div class="size-204 respon6-next">
									<div class="rs1-select2 bor8 bg0">
										<select class="js-select2" name="time">
											<option>Choose an option</option>
											<option>Red</option>
											<option>Blue</option>
											<option>White</option>
											<option>Grey</option>
										</select>
										<div class="dropDownSelect2"></div>
									</div>
								</div>
							</div>

							<div class="flex-w flex-r-m p-b-10">
								<div class="size-204 flex-w flex-m respon6-next">
									<div class="wrap-num-product flex-w m-r-20 m-tb-10">
										<div class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m" onClick={decrement}>
											<i class="fs-16 zmdi zmdi-minus"></i>
										</div>

										<input class="mtext-104 cl3 txt-center num-product" type="number" name="num-product" value={count} />

										<div class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m" onClick={incremet}>
											<i class="fs-16 zmdi zmdi-plus"></i>
										</div>
									</div>

									<button class="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail" onClick={addcard1}>
										Add to cart
									</button>
								</div>
							</div>	
						</div>

						<div class="flex-w flex-m p-l-100 p-t-40 respon7">
							<div class="flex-m bor9 p-r-10 m-r-11">
								<a href="#" class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 js-addwish-detail tooltip100" data-tooltip="Add to Wishlist">
									<i class="zmdi zmdi-favorite"></i>
								</a>
							</div>

							<a href="#" class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100" data-tooltip="Facebook">
								<i class="fa fa-facebook"></i>
							</a>

							<a href="#" class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100" data-tooltip="Twitter">
								<i class="fa fa-twitter"></i>
							</a>

							<a href="#" class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100" data-tooltip="Google Plus">
								<i class="fa fa-google-plus"></i>
							</a>
						</div>
					</div>
				</div>
			</div>
            </div>
            </section>
			<div class="bor10 m-t-50 p-t-43 p-b-40">
				<div class="tab01">	
					<ul class="nav nav-tabs" role="tablist">
						<li class="nav-item p-b-10">
							<p style={{cursor:'pointer'}} class="nav-link" data-toggle="tab"  onClick={()=>onTabChange(1)} role="tab">Description</p>
						</li>

						<li class="nav-item p-b-10">
							<p style={{cursor:'pointer'}} class="nav-link" data-toggle="tab"  onClick={()=>onTabChange(2)} role="tab">Additional information</p>
						</li>

						<li class="nav-item p-b-10">
							<p style={{cursor:'pointer'}} class="nav-link" data-toggle="tab"  onClick={()=>onTabChange(3)} role="tab">Reviews (1)</p>
						</li>
					</ul>
					<div class="tab-content p-t-43">
					{
						tab ==='tab1' ?
						<div class=" ">
							<div class="how-pos2 p-lr-15-md">
								<p class="stext-102 cl6">
									{data.description}
								</p>
							</div>
						</div>
						:null
					}
					{
						tab==='tab2'?
						<div class="" >
							<div class="row">
								<div class="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
									<ul class="p-lr-28 p-lr-15-sm">
										<li class="flex-w flex-t p-b-7">
											<span class="stext-102 cl3 size-205">
												Weight
											</span>

											<span class="stext-102 cl6 size-206">
												0.79 kg
											</span>
										</li>

										<li class="flex-w flex-t p-b-7">
											<span class="stext-102 cl3 size-205">
												Dimensions
											</span>

											<span class="stext-102 cl6 size-206">
												110 x 33 x 100 cm
											</span>
										</li>

										<li class="flex-w flex-t p-b-7">
											<span class="stext-102 cl3 size-205">
												Materials
											</span>

											<span class="stext-102 cl6 size-206">
												60% cotton
											</span>
										</li>

										<li class="flex-w flex-t p-b-7">
											<span class="stext-102 cl3 size-205">
												Color
											</span>

											<span class="stext-102 cl6 size-206">
												Black, Blue, Grey, Green, Red, White
											</span>
										</li>

										<li class="flex-w flex-t p-b-7">
											<span class="stext-102 cl3 size-205">
												Size
											</span>

											<span class="stext-102 cl6 size-206">
												XL, L, M, S
											</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
						:null
}
{
		tab==="tab3"?
		<div >
							<div class="row">
								<div class="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
									<div class="p-b-30 m-lr-15-sm">
									{dataReview.length>0 ?
									dataReview.map(item=>{
										return <div class="flex-w flex-t p-b-68">
									{/* {		<div class="wrap-pic-s size-109 bor0 of-hidden m-r-18 m-t-6">
												<img src="images/avatar-01.jpg" alt="AVATAR" />
											</div> */
									}
										
											<div class="size-207">
												<div class="flex-w flex-sb-m p-b-17">
													<span class="mtext-107 cl2 p-r-20">
														{item.fullname}
													</span>

													<span class="fs-18 cl11">
													{[1,2,3,4,5].map((id)=>{
														  if(id<=parseInt(item.rate))
														{
															return  <i  class="zmdi zmdi-star"></i>
														}
														else
														{
															return <i class="item-rating pointer zmdi zmdi-star-outline"></i>
														}
														
								                  	})
												}
													</span>
												</div>

												<p class="stext-102 cl6">
													{item.review}
												</p>
											</div>
								
										</div>
									})
								:null}
										<form class="w-full">
											<h5 class="mtext-108 cl2 p-b-7">
												Add a review
											</h5>

											<p class="stext-102 cl6">
												Your email address will not be published. Required fields are marked *
											</p>

											<div class="flex-w flex-m p-t-50 p-b-23">
												<span class="stext-102 cl3 m-r-16">
													Your Rating
												</span>
											{ displayrate===false ?
												<span class="wrap-rating fs-18 cl11 pointer">
													<i class="item-rating pointer zmdi zmdi-star-outline" onClick={()=>rating(1)} value={1}></i>
													<i class="item-rating pointer zmdi zmdi-star-outline"   onClick={()=>rating(2)} value={2}></i>
													<i class="item-rating pointer zmdi zmdi-star-outline"   onClick={()=>rating(3)} value={3}></i>
													<i class="item-rating pointer zmdi zmdi-star-outline"   onClick={()=>rating(4)} value={4}></i>
													<i class="item-rating pointer zmdi zmdi-star-outline"   onClick={()=>rating(5)} value={5}></i>
													<input class="dis-none" type="number" name="rating" />
												</span>
												:
												[1,2,3,4,5].map((id)=>{
												 return	<span class="wrap-rating fs-18 cl11 pointer">
													 {id<=rate.length ?
												 	<i  class="zmdi zmdi-star" onClick={()=>rating(id)}></i>	
													:
													<i class="item-rating pointer zmdi zmdi-star-outline"   onClick={()=>rating(id)} value={5}></i>
												}
													 </span>
											 })
											}
											</div>

											<div class="row p-b-25">
												<div class="col-12 p-b-5">
													<label class="stext-102 cl3" for="review">Your review</label>
													<textarea class="size-110 bor8 stext-102 cl2 p-lr-20 p-tb-10" id="review" onChange={(e)=>setReview(e.target.value)} name="review"></textarea>
												</div>

												{/*<div class="col-sm-6 p-b-5">
													<label class="stext-102 cl3" for="name">Name</label>
													<input class="size-111 bor8 stext-102 cl2 p-lr-20" id="name" type="text" name="name" />
												</div>

												<div class="col-sm-6 p-b-5">
													<label class="stext-102 cl3" for="email">Email</label>
													<input class="size-111 bor8 stext-102 cl2 p-lr-20" id="email" type="text" name="email" />
										</div>*/}
											</div>

											<button class="flex-c-m stext-101 cl0 size-112 bg7 bor11 hov-btn3 p-lr-15 trans-04 m-b-10" onClick={reviewsubmit}>
												Submit
											</button>
										</form>
									</div>
							
								</div>
							</div>
						</div>
						:null
}
					</div>
				</div>
			</div>
			{
				loginAlert===true ?
				<SweetAlert title="You Need to Login First!" onConfirm={onConfirm} />
				:null
}
{ displayCartAlert === true ?
                <SweetAlert success title={obj.name} onConfirm={onConfirm} >
                    is added to Cart !
                 </SweetAlert>
                : null
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
		</div>
    )
}
const mapStateToProps = state => {
	return {
	   todo: state,
	 };
   };
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
	 addtocard
    }, dispatch)
	
  }
export default connect(mapStateToProps,mapDispatchToProps)(Product);