import React,{useEffect}from 'react'
import banner1 from '../../images/banner-01.jpg'
import banner2 from '../../images/banner-02.jpg'
import banner3 from '../../images/banner-03.jpg';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {userid,addwish,addtocard} from '../../Action/Action';
import axios from 'axios';
const Home = (props) => {
	useEffect(async() => {  
        props.userid(localStorage.getItem('user_id'));
		if(props.todo.AddWishReducer.cart.length===0 && localStorage.getItem('user_id')!==null)
		{
			console.log("its matched");
	    const ans=await axios.post('http://secret-bastion-22485.herokuapp.com/wishdata',{
		user_id:localStorage.getItem('user_id')
        	})
			ans.data.map(item=>{
				const obj={			
						name:item.productname,
						price:item.product_price,
						imageURl:item.product_image,
						product_id:item.product_id
				}
				 props.addwish(obj,1);
				 return 
			})
		}
		if(props.todo.AddToCartReducer.Addcart.length===0  && localStorage.getItem('user_id')!==null)
		{
			console.log("cart is called");
			const ans1=await axios.post('http://secret-bastion-22485.herokuapp.com/cartdata',{
				user_id:localStorage.getItem('user_id')
			})
			console.log(ans1.data);
			ans1.data.map(item=>{
				console.log(item);
			 	const obj={			
					name:item.productname,
		              price:item.product_price,
			 			imageURl:item.product_image,
			 			product_id:item.product_id
			 	}
				console.log("item is",item);
            	 props.addtocard(obj,parseInt(item.product_quantity));
				 return 
			 })
			}
     },[])
    return (
        <div style={{marginTop:"5px"}}>
        <div class="sec-banner bg0 p-t-80 p-b-50">
		<div class="container">
			<div class="row">
				<div class="col-md-6 col-xl-4 p-b-30 m-lr-auto">
					<div class="block1 wrap-pic-w">
						<img src={banner1} alt="IMG-BANNER" />

						<Link to={`/serachfeed?type=gender&value=women`}className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3">
							<div class="block1-txt-child1 flex-col-l">
								<span class="block1-name ltext-102 trans-04 p-b-8">
									Women
								</span>

								<span class="block1-info stext-102 trans-04">
									Spring 2018
								</span>
							</div>

							<div class="block1-txt-child2 p-b-4 trans-05">
								<div class="block1-link stext-101 cl0 trans-09">
									Shop Now
								</div>
							</div>
						</Link>
					</div>
				</div>

				<div class="col-md-6 col-xl-4 p-b-30 m-lr-auto">
					<div class="block1 wrap-pic-w">
						<img src={banner2} alt="IMG-BANNER" />

						<Link to={`/serachfeed?type=gender&value=men`} class="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3">
							<div class="block1-txt-child1 flex-col-l">
								<span class="block1-name ltext-102 trans-04 p-b-8">
									Men
								</span>

								<span class="block1-info stext-102 trans-04">
									Spring 2018
								</span>
							</div>

							<div class="block1-txt-child2 p-b-4 trans-05">
								<div class="block1-link stext-101 cl0 trans-09">
									Shop Now
								</div>
							</div>
						</Link>
					</div>
				</div>

				<div class="col-md-6 col-xl-4 p-b-30 m-lr-auto">
					
					<div class="block1 wrap-pic-w">
						<img src={banner3} alt="IMG-BANNER" />

						<Link to={`/serachfeed?type=acc&value=Accessories`} class="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3">
							<div class="block1-txt-child1 flex-col-l">
								<span class="block1-name ltext-102 trans-04 p-b-8">
									Accessories
								</span>

								<span class="block1-info stext-102 trans-04">
									New Trend
								</span>
							</div>

							<div class="block1-txt-child2 p-b-4 trans-05">
								<div class="block1-link stext-101 cl0 trans-09">
									Shop Now
								</div>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</div>
	</div>
    </div>
    )
}
const mapStateToProps = state => {
	console.log(state);
	return {
	   todo: state,
	//   cartUpdated: () => { return true }
	 };
   };
 const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      userid,
	  addwish,
	 addtocard
	}, dispatch)
	
  }
export default connect(mapStateToProps,mapDispatchToProps)(Home);

