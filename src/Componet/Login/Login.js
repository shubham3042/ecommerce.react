import React,{useState} from 'react'
import axios from  'axios';
// import './vendor/daterangepicker/daterangepicker.css';
// import './vendor/select2/select2.min.css';
// import './vendor/animsition/css/animsition.min.css';
// import './vendor/css-hamburgers/hamburgers.min.css';
// import './fonts/font-awesome-4.7.0/css/font-awesome.min.css';
// import './vendor/animate/animate.css';
// import './vendor/select2/select2.min.css';
// import './vendor/bootstrap/css/bootstrap.min.css';
// import './fonts/iconic/css/material-design-iconic-font.min.css';
import './css/util.css';
import './css/main.css';
import {Link,Redirect,Switch}from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {userid} from '../../Action/Action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SweetAlert from 'react-bootstrap-sweetalert';
import VisibilityIcon from '@material-ui/icons/Visibility';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
      },
  }));
function Login(props) {
    const [email,setEmail]=useState('');
	const [password,setPassword]=useState('');
	const [redirectHome,setRedirectHome]=useState(null);
	const [emailAlert,setEmailAlert]=useState(false);
	const [passwordVisible,setPasswordVisible]=useState(false);
	const [redAlert,setRedAlert]=useState(false);
	const emailvalue=(e)=>{
		console.log(e.target.value);
		setEmail(e.target.value);
	}
	const passwordvalue=(e)=>{
		setPassword(e.target.value)
	}
	const onReceiveInput=(response)=>{
		axios.post('http://secret-bastion-22485.herokuapp.com/sendMail',{
				email:response
		}).then(res=>alert(res.data));
		setEmailAlert(false);
	}
	const forgetpassword=()=>{
       setEmailAlert(true);
	}
	const onCancel=()=>{
		setEmailAlert(false);
	}
	const onSubmit=async(e)=>{
		e.preventDefault();
   const ans=await axios.post('http://secret-bastion-22485.herokuapp.com/login',{
			email:email,
			password:password
		});

		console.log("hello",ans.data);
		if(ans.data===false)
		{
			setRedAlert(true);
		}
		else
		{
			localStorage.setItem('user_id',ans.data[0].user_id);
			localStorage.setItem('name',ans.data[0].fullname);
			props.userid(ans.data[0].user_id);
			setRedirectHome(true);
		}
	// await setRedirectHome(ans.data);
	// await localStorage.setItem('user_id',redirectHome.user_id);
	}
	const visiblepass=()=>{
		setPasswordVisible(true);
	}
    return (
        <div>
        <div class="limiter">
		  <div class="container-login100">
			 <div class="wrap-login100">
				 <form class="login100-form validate-form">
					<span class="login100-form-title p-b-26">
						Welcome
					</span>	
                    <TextField onChange={emailvalue} style={{marginTop:"20px",fontSize:'10px',paddingTop:"8px",width:"250px"}} id="standard-basic" label="Email" size="Large"/>	
                    { passwordVisible===false ?
					<React.Fragment>
					<TextField onChange={passwordvalue} style={{marginTop:"20px",fontSize:'5px',paddingTop:"8px",width:"250px"}} id="standard-basic" label="Password" type="password" size="small"/>
					<VisibilityIcon style={{marginTop:"35px",marginLeft:"5px",cursor:"pointer"}} onClick={visiblepass} />	
					</React.Fragment>
					:
					<React.Fragment>
					<TextField onChange={passwordvalue} style={{marginTop:"20px",fontSize:'5px',paddingTop:"8px",width:"250px"}} id="standard-basic" label="Password" size="small"/>
					<VisibilityIcon style={{marginTop:"35px",marginLeft:"5px",cursor:"pointer",color:"blue"}} onClick={()=>{setPasswordVisible(false)}} />
					</React.Fragment>
				}
					<div class="container-login100-form-btn">
						<div class="wrap-login100-form-btn">
							<div class="login100-form-bgbtn"></div>
							<button class="login100-form-btn" onClick={onSubmit}>
								Login
							</button>
						</div>
					</div>
					<div class="text-center p-t-20">
						<span class="txt1" style={{cursor:"pointer"}} onClick={forgetpassword}>
						 	ForgetPassword?
						</span>
					</div>
					<div class="text-center p-t-15">
						<span class="txt1">
							Don’t have an account?
						</span>

						<Link class="txt2" to="/signup">
							Sign Up
						</Link>
					</div>
				</form>
				{redAlert===true?
				<h5 style={{color:"red"}}>Password or email addresss wrong</h5>
               :null
			   }
			</div>
		</div>
	</div>
	{ redirectHome!==null ?
			<Switch>
				<Redirect to="/" from="/login"/>
			</Switch>
	:null
    }
	{
		emailAlert===true ?
		<SweetAlert
			input
			showCancel
			cancelBtnBsStyle="light"
			title="Enter Your EmailAddress"
			placeHolder="Write something"
			onConfirm={(response) => onReceiveInput(response)}
			onCancel={onCancel}
	/>
	   :null
	}
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
		userid
    }, dispatch)
	
  }
export default connect(mapStateToProps,mapDispatchToProps)(Login);
