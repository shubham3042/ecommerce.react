import React, { useState,useEffect} from 'react';
import Card from './Card';
import '../../vendor/bootstrap/css/bootstrap.min.css';
import '../../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../../fonts/iconic/css/material-design-iconic-font.min.css';
import '../../fonts/linearicons-v1.0.0/icon-font.min.css';
import '../../css/util.css';
import '../../css/main.css';
import axios from  'axios';
import { TrendingUpRounded } from '@material-ui/icons';
function Cardlist(props) {
    const[data,setData]=useState([]);
	const [filterVisiblity,setFilterVisibility]=useState(false);
	const [searchrVisiblity,setSearchVisibility]=useState(false);
        useEffect(async() => {  
                 getproducts();
                 //await setData(ans.data);
        },[]);
		const getproducts=async()=>{
			const ans=await axios.get('http://secret-bastion-22485.herokuapp.com/getproduct');
                 setData(ans.data);
                 console.log(ans.data);
		}
    const filter=async(e)=>{
        console.log(e.target.value);
		if(e.target.value==='All Products')
		{
			getproducts();
		}
		else
		{
        const ans=await axios.get(`http://secret-bastion-22485.herokuapp.com/filter?value=${e.target.value}`);
		setData(ans.data);
		}
    }
	const accessories=async(e)=>{
		console.log(filterVisiblity);
		console.log(searchrVisiblity);
		const ans=await axios.get(`http://secret-bastion-22485.herokuapp.com/category?value=${e.target.value}`);
		setData(ans.data);
	}
	const onSearch=async(e)=>{
			if(e.which===13)
			{
				const ans=await axios.get(`http://secret-bastion-22485.herokuapp.com/search?value=${e.target.value}`);
		        setData(ans.data);
			}
	}
    return (
        <React.Fragment>
            <div class="bg0 m-t-23 p-b-140" style={{ marginTop: '85px' }}>
	        	<div class="container">
			        <div class="flex-w flex-sb-m p-b-52" >
                    <div class="flex-w flex-l-m filter-tope-group m-tb-10" > 
					<button class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" onClick={filter} value="All Products" data-filter="*">
						All Products
					</button>

					<button class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" value="women" onClick={filter} data-filter=".women">
						Women
					</button>

					<button class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" value="men" onClick={filter} data-filter=".men">
						Men
					</button>

					<button class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" value="Accessories" onClick={accessories} data-filter=".bag">
					Accessories
					</button>
				</div>
				</div>

					<div class="panel-search w-full p-t-10 p-b-15" style={{marginTop:"-65px"}}>
					<div class="bor8 dis-flex p-l-15">
						<button class="size-113 flex-c-m fs-16 cl2 trans-04">
							<i class="zmdi zmdi-search"></i>
						</button>
						<input class="mtext-107 cl2 size-114 plh2 p-r-15" type="text" onKeyPress={onSearch} name="search-product" placeholder="Search" />	
				    	</div>
						</div>
        <div className="row isotope-grid" style={{marginTop:"10px"}}>
           {
               data.length>0 ?
               data.map(item=>{
                    return <Card image1={item.product_image} name={item.productname} price={item.product_price} product_id={item.product_id}/>
               }):null
           }
        </div>
		</div>
		</div>
        </React.Fragment>


    )
}

export default Cardlist
