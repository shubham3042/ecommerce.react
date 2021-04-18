import React,{useState}from 'react';
import { Link,Redirect,Switch} from 'react-router-dom';
import 'tachyons';
import axios from 'axios';
const Register =()=>{
  const[fullName,setFullname]=useState('');
  const[email,setEmail]=useState('');
  const[mobilenum,setMobilenum]=useState('');
  const[password,setPassword]=useState('');
  const [res,setRes]=useState(false);
  const onsubmit=(e)=>{
    e.preventDefault();
    axios.post('http://secret-bastion-22485.herokuapp.com/signup',{
      fullname:fullName,
      email:email,
      mobilenum:mobilenum,
      password:password
    }).then(res=>setRes(res.data));
    
  }
    return(
        <div>
        <main className="pa4 black-80">
           <form className="measure center">
   <fieldset id="sign_up" className="ba b--transparent ph0 mh0" >
       <legend className="f4 fw6 ph0 mh0">Sign Up</legend>
       <div className="mt3">
         <label className="db fw6 lh-copy" for="Firstname">FullName</label>
         <input onChange={(e)=>setFullname(e.target.value)} className="pa2 input-reset ba w-100 " type="text" name="Firstname" />
       </div>
       <div className="mt3">
         <label className="db fw6 lh-copy  css1" for="email-address">Email</label>
         <input onChange={(e)=>setEmail(e.target.value)} className="pa2 input-reset ba bg-transparent hover-bg-black hover-black w-100" type="email" name="email-address"  id="email-address" />
       </div>
       <div className="mt2">
         <label className="db fw6 lh-copy  css1" for="moilenum">Mobile num</label>
         <input onChange={(e)=>setMobilenum(e.target.value)} className="pa2 input-reset ba bg-transparent hover-bg-black hover-black w-100" type="number" name="mobilenum" />
       </div>
    
       <div className="mv3">
         <label  className="db fw6 lh-copy css1" for="password">Password</label>
         <input onChange={(e)=>setPassword(e.target.value)} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-black w-100" type="password" name="password"  id="password" />
       </div>
  </fieldset>
     <div class="">
       <input onClick={onsubmit} class="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib css1" type="submit" value="Sign up" />   
     </div>
     <div>
       <Link to="/login" class="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib css1">   
        Already Have Account?
        </Link>
     </div>
   </form>
 </main>
{
  res===true ?
  <Switch>
      <Redirect to="/login" from="/signup"/>
  </Switch>
  :null
}
   </div>
    )
}
export default Register;