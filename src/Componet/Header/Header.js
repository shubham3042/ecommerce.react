import React from 'react';
//import React,{useState,useEffect} from 'react';
import {Link,Redirect,Switch,Route} from 'react-router-dom';
///import './header.scss';
import '../../vendor/bootstrap/css/bootstrap.min.css';
import '../../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../../fonts/iconic/css/material-design-iconic-font.min.css';
import '../../fonts/linearicons-v1.0.0/icon-font.min.css';
// import '../../vendor/animate/animate.css';
import '../../vendor/css-hamburgers/hamburgers.min.css';
// import '../../vendor/animsition/css/animsition.min.css';
 import  '../../vendor/select2/select2.min.css';
  import '../../vendor/daterangepicker/daterangepicker.css';
 import  '../../vendor/slick/slick.css';
import '../../vendor/MagnificPopup/magnific-popup.css';
import '../../vendor/perfect-scrollbar/perfect-scrollbar.css';
import '../../css/util.css';
import '../../css/main.css';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import logo from '../../images/icons/logo-01.png';
import cancel from '../../images/icons/icon-close2.png';
import {removewishlist,removeuser,removecart} from '../../Action/Action';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Dropdown} from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import SearchFeed from '../Search/SearchFeed';
class Header extends React.Component {
		constructor(props)
		{
			super();
			this.state={
				show:false,
				addwishLength:0,
				user_id:null,
				redirect:false,
				logoutalert:false,
				search:'',
				searchRedirect:false
			}
			this.handleClose=this.handleClose.bind();
			this.shubham=this.shubham.bind();
			this.logout=this.logout.bind();
			this.onCancel=this.onCancel.bind();
			this.onConfirm=this.onConfirm.bind();
			this.onSearch=this.onSearch.bind();
		}
	onSearch=(e)=>{
		//e.preventDefault();
	
		if(e.which===13)
		{
			this.setState({search:e.target.value});
			this.setState({searchRedirect:true})
		}
	}
   handleClose = ()=>this.setState({show:false});   
      shubham=()=>{
		  this.setState({show:true});
	}
	onConfirm=()=>{
		
		this.props.removeuser();
		console.log("called");
		this.setState({user_id:null});
		localStorage.removeItem('user_id');
		this.props.removewishlist();
		this.props.removecart();
		this.setState({redirect:true});
		this.setState({logoutalert:false});
	}
	onCancel=()=>{
		this.setState({logoutalert:false});
	}
	logout=(e)=>{
		e.preventDefault();
		console.log("hello");
		this.setState({logoutalert:true});
	}
	render(){
		//this.props.cartUpdated();
		console.log(this.props.todo.AddWishReducer.cart.length);
    return (	
        <div>
	
		<div className="container-menu-desktop">
			{
				this.state.redirect===true ?
				<Redirect to="/" />
				:null	
			}
			<div className="wrap-menu-desktop" style={{top:'0px',backgroundColor:"white"}}>
				<nav className="limiter-menu-desktop container">
					<a href="#" className="logo">
						<img src={logo} alt="IMG-LOGO" />
					</a>

					<div className="menu-desktop">
						<ul className="main-menu">
							<li>
								<Link to="/">Home</Link>
							</li>

							<li>
								<Link to="/products">Shop</Link>
							</li>

							<li className="label1" data-label1="hot">
								<a href="shoping-cart.html">Features</a>
							</li>
						
							<li>
								<a href="#">About</a>
							</li>

							<li>
								<a href="#">Contact</a>
							</li>
							{
						/*	this.props.todo.UserReducer.user_id!==null ?
							<li style={{cursor:"pointer"}}>
								<a onClick={this.logout}>Log Out</a>
							</li>
							:
							<li>
								<Link to="/login">Login</Link>
							</li>*/
	                     }
						
						</ul>
					</div>	
					<div className="wrap-icon-header flex-w flex-r-m">
						<div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-search" >
							<i onClick={this.shubham} className="zmdi zmdi-search"></i>
						</div>

						<Link to="/Addcart" className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart" data-notify={this.props.todo.AddToCartReducer.Addcart.length}> 
							<i className="zmdi zmdi-shopping-cart"></i>
						</Link>
						<Link to="/WishList" className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti" data-notify={this.props.todo.AddWishReducer.cart.length}>
							<i className="zmdi zmdi-favorite-outline"></i>
						</Link>
						<p className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11">
						<Dropdown>
							<Dropdown.Toggle style={{padding:'0px',marginTop:"-5px",marginLeft:"0px",color:'black',backgroundColor:'white',borderColor:'white'}}>
						              <AccountCircleIcon />	
						   </Dropdown.Toggle>	
						   {
							   this.props.todo.UserReducer.user_id!==null ?
							<Dropdown.Menu>
								<Dropdown.Item><Link to="/profile">My Profile</Link></Dropdown.Item>
								<Dropdown.Item href="#" onClick={this.logout}>Logout</Dropdown.Item>
								<Dropdown.Item href="#/action-3"></Dropdown.Item>
							</Dropdown.Menu>
							:<Dropdown.Menu>
								<Link to="/login" style={{marginLeft:"20px"}}>Login</Link>
							</Dropdown.Menu>
	                        }                     
							</Dropdown>
						
						</p>
					</div>
				</nav>
			</div>	
		</div>
	
		<div className="wrap-header-mobile">
			<div className="logo-mobile">
				<a href="index.html"><img src={logo} alt="IMG-LOGO" /></a>
			</div>

			<div className="wrap-icon-header flex-w flex-r-m m-r-15">
				<div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 js-show-modal-search">
					<i onClick={this.shubham} className="zmdi zmdi-search"></i>
				</div>

				<Link to="/Addcart" className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart" data-notify={this.props.todo.AddToCartReducer.Addcart.length}>
					<i className="zmdi zmdi-shopping-cart"></i>
				</Link>

				<Link to="/WishList" className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti" data-notify={this.props.todo.AddWishReducer.cart.length}>
							<i className="zmdi zmdi-favorite-outline"></i>
				</Link>
				<p className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11">
				<Dropdown>
							<Dropdown.Toggle style={{padding:'0px',marginTop:"-5px",marginLeft:"0px",color:'black',backgroundColor:'white',borderColor:'white'}}>
						              <AccountCircleIcon />	
						   </Dropdown.Toggle>	
						   {
							   this.props.todo.UserReducer.user_id!==null ?
							<Dropdown.Menu>
								<Dropdown.Item>
								<Link to="/" >Home</Link>
								</Dropdown.Item>
								<Dropdown.Item>
								<Link to="/products" >Shop</Link>
								</Dropdown.Item>
								<Dropdown.Item>My Profile</Dropdown.Item>
								<Dropdown.Item href="#" onClick={this.logout}>Logout</Dropdown.Item>
								<Dropdown.Item href="#/action-3"></Dropdown.Item>
							</Dropdown.Menu>
							:<Dropdown.Menu>
								<Link to="/login" style={{marginLeft:"20px"}}>Login</Link>
							</Dropdown.Menu>
	                        }                     
							</Dropdown>
						
				</p>
			</div>
			{/*
				<div className="btn-show-menu-mobile hamburger ">
				<span className="hamburger-box">
					<span className="hamburger-inner"></span>
				</span>
			</div>*/
			}
		</div>
	
	
		<div className="menu-mobile">
			<ul className="topbar-mobile">
				<li>
					<div className="left-top-bar">
						Free shipping for standard order over $100
					</div>
				</li>

				<li>
					<div className="right-top-bar flex-w h-full">
						<a href="#" className="flex-c-m p-lr-10 trans-04">
							Help & FAQs
						</a>

						<a href="#" className="flex-c-m p-lr-10 trans-04">
							My Account
						</a>

						<a href="#" className="flex-c-m p-lr-10 trans-04">
							EN
						</a>

						<a href="#" className="flex-c-m p-lr-10 trans-04">
							USD
						</a>
					</div>	
				</li>
			</ul>

			<ul className="main-menu-m">
				<li>
					<Link to="/">Home</Link>
					<ul className="sub-menu-m">
						<li><a href="index.html">Homepage 1</a></li>
						<li><a href="home-02.html">Homepage 2</a></li>
						<li><a href="home-03.html">Homepage 3</a></li>
					</ul>
					<span className="arrow-main-menu-m">
						<i className="fa fa-angle-right" aria-hidden="true"></i>
					</span>
				</li>

				<li>
					<Link to="/products">Shop</Link>
				</li>

				<li>
					<a href="#" className="label1 rs1" data-label1="hot">Features</a>
				</li>


				<li>
					<a href="#">About</a>
				</li>

				<li>
					<a href="#">Contact</a>
				</li>
				{
							this.props.todo.UserReducer.user_id!==null ?
							<li style={{cursor:"pointer"}}>
								<a onClick={this.logout}>Log Out</a>
							</li>
							:
							<li>
								<Link to="/login">Login</Link>
							</li>
	             }
			</ul>
		</div>
	{ this.state.show ===true ?
		<div className="flex-c-m trans-04 w100" style={{marginTop:'130px'}}>
				<div class="container-search-header">	
				<button class="flex-c-m btn-hide-modal-search trans-04 " onClick={this.handleClose}>
					<img src={cancel} alt="CLOSE" />
				</button>
				<div className="wrap-search-header flex-w p-l-15">
					<button className="flex-c-m trans-04">
						<i className="zmdi zmdi-search"></i>
					</button>
					<input type="text" name="search" placeholder="Search..." onKeyPress={this.onSearch} />
				</div>
				</div>
		
	    </div>
	:null	
  }
  		{
				this.state.logoutalert===true ?
						<SweetAlert
						warning
						showCancel
						confirmBtnText="Logout!"
						confirmBtnBsStyle="danger"
						title="Are you sure?"
						onConfirm={this.onConfirm}
						onCancel={this.onCancel}
						focusCancelBtn
					>
			  </SweetAlert>
			  :null
				}
				{
					this.state.searchRedirect===true?
						<Redirect to={`/serachfeed?type=search&value=${this.state.search}`} />

						:null
	}
</div>
    )
}
} 
const mapStateToProps = state => {
	return {
	   todo: state,
	//   cartUpdated: () => { return true }
	 };
   };
 const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
		removeuser,
		removewishlist,
		removecart	
}, dispatch)
	
  }
export default connect(mapStateToProps,mapDispatchToProps)(Header);
                   