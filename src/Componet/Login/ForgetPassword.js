import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Form } from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from  'axios';
import {Redirect} from 'react-router-dom';
function ForgetPassword() {
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [passwordMatchAlert,setPasswordMatchAlert]=useState(false);
    const [msg,setMsg]=useState('');
    const [redirect,setRedirect]=useState(false);
    let { id } = useParams();
    const onpassword = (e) => {
        console.log(e.target.value);
        console.log(id);
        setPassword(e.target.value);
    }
    const onConfirmPassword = (e) => {
        setConfirmpassword(e.target.value);
    }
    const onChangePassword = async(e) => {
        console.log(password);
        console.log(confirmpassword);
        if (password === confirmpassword) {
          const ans =await axios.post('http://secret-bastion-22485.herokuapp.com/user/Changepassword',{
                id:id,
                password:password
            });
            setMsg(ans.data);
        }
        else {
            setPasswordMatchAlert(true);
        }
    }
   const onConfirm =()=>{
        
        setMsg('');
        setPassword('');
        setConfirmpassword('');
      //  setRedirect(true);
   }
   const onConfirm2=()=>{
    setPasswordMatchAlert(false);
   }
    return (
        <div>
            <h3 style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>Change Password</h3>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={onpassword} value={password} />
                </Form.Group>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "2px" }}>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" value={confirmpassword} onChange={onConfirmPassword}/>
                </Form.Group>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "2px" }}>
                <button onClick={onChangePassword}>Change Passoword</button>
            </div>
            {
                passwordMatchAlert===true ?
                <SweetAlert title="Passoword is not match!" onConfirm={onConfirm2} />
                :null
            }
            {
                msg==='Something is Wrong'?
                <SweetAlert
                warning
                confirmBtnText="okk"
                confirmBtnBsStyle="danger"
                title="Link is Expire"
                onConfirm={onConfirm}
                focusCancelBtn
                />
                :null
            }
            {
                msg==='password Change SuccessFully'?
                <SweetAlert title={msg} onConfirm={onConfirm} />
                :null
            }
            {
                redirect===true ?
                <Redirect to="/login"/>
                :null
            }
        </div>
    )
}
export default ForgetPassword