import React,{useState,useEffect} from 'react';
import Cards from 'react-credit-cards';
import CreditCardInput from 'react-credit-card-input';
import SweetAlert from 'react-bootstrap-sweetalert';
import {Redirect} from 'react-router-dom';
import {Form} from 'react-bootstrap';
import axios from 'axios';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CloseIcon from '@material-ui/icons/Close';
import {connect} from 'react-redux';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

import {bindActionCreators} from 'redux';
function Checkout (props){
    const [alert,setAlert]=useState(false);
    const [redirect,setRedirect]=useState(false);
    const [paymentalert,setPaymentAlert]=useState(false);
    const [address,setAddress]=useState('');
    const [address2,setAddress2]=useState('');
    const [city,setCity]=useState('');
    const[zip,setZip]=useState('');
    const[state,setState]=useState('');
    const [value,setValue]=useState('');
    const [mulAddress,setMulAddress]=useState([]);
    const [displayAddress,setDisplayAddress]=useState(false);
    const [closeAddress,setCloseAddress]=useState(false);
    const handleCardNumberChange=(e)=>{
        setCardNumber(e.target.value);
    }
    const handleCardExpiryChange=(e)=>{
        setExpiery(e.target.value);
    } 
    const handleCardCVCChange=(e)=>{
        setCVC(e.target.value);
    }
    const onCancel=()=>{
        setAlert(false);
    }
    const payment=async (e)=>{
        e.preventDefault();
        setAlert(true);
    }
    const callAddAdress=async(e)=>{
        e.preventDefault();
        const ans=await axios.post('http://secret-bastion-22485.herokuapp.com/user/address',{
            address:address,
            address2:address2,
            city:city,
            state:state,
            zip:zip,
            user_id:localStorage.getItem('user_id')
          })
          const obj ={
              address:ans.data.address,
              address2:ans.data.address2,
              city:ans.data.city,
              state:ans.data.state,
              zip:ans.data.zip
          }
          let d=mulAddress;
          d.push(obj);
          setMulAddress(d);
          setCloseAddress(false);
        setDisplayAddress(false);
    }
    useEffect(async()=>{
        const ans=await axios.post('http://secret-bastion-22485.herokuapp.com/getuser/address',{
                user_id:localStorage.getItem('user_id')
        });
        console.log(ans.data);
        if(ans.data.length>0)
        {
            const add=`${ans.data[0].address}, ${ans.data[0].address2},${ans.data[0].city}, ${ans.data[0].state}, ${ans.data[0].zip}`;
            console.log(add);
            setValue(add);
        }
        setMulAddress(ans.data);
    },[])
    const onConfirm=()=>{
        setAlert(false);
        //setRedirect(true);
        setPaymentAlert(true);
       // localStorage.removeItem('amount');
       axios.post('http://secret-bastion-22485.herokuapp.com/addHistory',{
            cart:props.todo.AddToCartReducer.Addcart,
            user_id:localStorage.getItem('user_id'),
            address:value
       })
    }
    const Onpayemtconfirm=()=>{
    setPaymentAlert(false);
     setRedirect(true);  
     localStorage.removeItem('amount'); 
    }
    const handleChange=(e)=>{
        console.log(e.target.value);
        setValue(e.target.value);
    }
    const displayAdd=(e)=>{
        setDisplayAddress(true);
        setCloseAddress(true);
    }
    const canceladdress=()=>{
        setCloseAddress(false);
        setDisplayAddress(false);
   }
    const [cardNumber,setCardNumber]=useState(0);
    const [expiry,setExpiery]=useState('');
    const [cvc,setCVC]=useState('');
    return (
      <div style={{marginTop:"85px"}} >
        <h1>Your payment Amount is : {localStorage.getItem('amount')} $</h1>
        <FormControl component="fieldset" style={{marginLeft:"30px"}}>
            <FormLabel component="legend">Address</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                {
                    mulAddress.length>0 ?
                    mulAddress.map(item=>{
                        const add=`${item.address}, ${item.address2},${item.city}, ${item.state}, ${item.zip}`;
                        return <FormControlLabel value={add} control={<Radio />} label={add} />
                    })
                    :null                 
                }
                </RadioGroup>
                { closeAddress===false ?
                <React.Fragment>
                <FormLabel >Add Address</FormLabel>
                <AddBoxIcon style={{cursor:'pointer'}} onClick={displayAdd} />
                </React.Fragment>
                :<CloseIcon style={{cursor:"pointer",marginLeft:"480px"}} onClick={canceladdress}/>
            }
    </FormControl>
    {
        displayAddress===true ?
        <Form style={{width:"500px",marginLeft:"30px"}}>
                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control onChange={(e)=>setAddress(e.target.value)} placeholder="1234 Main St" />
                    </Form.Group>

                    <Form.Group  controlId="formGridAddress2">
                        <Form.Label>Address 2</Form.Label>
                        <Form.Control onChange={(e)=>setAddress2(e.target.value)} placeholder="Apartment, studio, or floor" />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group  controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control onChange={(e)=>setCity(e.target.value)} />
                        </Form.Group>

                        <Form.Group  controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Control as="select" defaultValue="Choose..." onChange={(e)=>setState(e.target.value)}>
                            <option>Choose...</option>
                            <option value='Gujarat'>Gujarat</option>
                            <option value="UP">Up</option>
                            <option value="Mp">Mp</option>
                        </Form.Control>
                        </Form.Group>

                        <Form.Group  controlId="formGridZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control  onChange={(e)=>setZip(e.target.value)}/>
                        </Form.Group>
                    </Form.Row>
                    <button variant="primary" onClick={callAddAdress}>
                         Submit
                     </button>

            </Form>
            :null
}

        <div style={{display:"flex",justifyContent:"flex-start",border:'2px',borderColor:"black",padding:"5px"}}>
        <CreditCardInput
                cardNumberInputProps={{ value: cardNumber,onChange:handleCardNumberChange }}
                cardExpiryInputProps={{ value: expiry, onChange: handleCardExpiryChange }}
                cardCVCInputProps={{ value: cvc, onChange:handleCardCVCChange }}
                fieldClassName="input"
        />
           <List component="nav" aria-label="secondary mailbox folder">
            {
                alert === true ?
                <SweetAlert
                title="You Want to Order on This Address!"
                onConfirm={onConfirm}
                onCancel={onCancel}
                showCancel={true}
                 >
                     
                  </SweetAlert>
              :null
            }
            </List>
        	{ paymentalert === true ?
                <SweetAlert success title={`$ ${localStorage.getItem('amount')}`} onConfirm={Onpayemtconfirm} >
                   Payment is Done
                 </SweetAlert>
                : null
            } 
            {
                redirect===true ?
                <Redirect to="/products" from="/checkout" />
                :null
            }
        </div>
        <div>
            <button  style={{marginLeft:"30px",backgroundColor:"black",color:"white",padding:"5px",cursor:"pointer"}} onClick={payment}>Payment</button>
        </div>
        </div>
    );
  
}
const mapStateToProps = state => {
    console.log(state);
	return {
	   todo: state,
	 };
   };
export default connect(mapStateToProps,null)(Checkout);