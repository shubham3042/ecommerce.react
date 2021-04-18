import React,{useState,useEffect}from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
const Profile=(props)=>{
    const [data,setData]=useState([]);
    const [date,setDate]=useState('');
    const [msg,setMsg]=useState('');
    let dated;
    useEffect(async()=>{
     const ans=await axios.post('http://secret-bastion-22485.herokuapp.com/getHistory',{
                user_id:localStorage.getItem('user_id')
        })
        //console.log(ans.data);
        setData(ans.data);
        setMsg('You not order anything')
    },[]);
    const dateChange=(e)=>{
            setDate(e.target.value);
    }
    const onsubmit=async()=>{
        console.log(date);
         const ans=await axios.get(`http://secret-bastion-22485.herokuapp.com/selectdate?date=${date}&id=${localStorage.getItem('user_id')}`);
        //console.log(ans.data);
        setData(ans.data);
        setMsg("You not Order anything that date");
    }
    const showall=async()=>{
        const ans=await axios.post('http://secret-bastion-22485.herokuapp.com/getHistory',{
            user_id:localStorage.getItem('user_id')
    })
    //console.log(ans.data);
    setData(ans.data);
    setMsg('You not order anything')
    }
    return(
        <div style={{marginTop:"85px"}}>
            <h3>Hello, {localStorage.getItem('name')}</h3>
            <div  style={{display:"flex",marginTop:"5px",marginLeft:"50px"}}>
            <TextField
        id="date"
        label="Select Date"
        type="date"
        defaultValue={Date.now}
        onChange={dateChange}
        InputLabelProps={{
          shrink: true,
        }}  
      />
      <button style={{marginLeft:"10px"}} onClick={onsubmit}>submit</button>
      <div style={{display:"flex",marginLeft:"100px"}}>
                    <button onClick={showall}>
                            Show All Order
                    </button>
                </div>  
          </div>
            {
                data.length>0 ?
            <React.Fragment>
                <h3 style={{display:"flex",justifyContent:"center",marginTop:"10px"}}>Previous Order</h3>

              <form class="bg0 p-t-75 p-b-85" style={{marginTop:"-40px"}}>   
                <div class="container">
                    <div class="row">
                        <div class="col-lg-10 col-xl-11 m-lr-auto m-b-30">
                            <div class="m-l-28 m-r--38 m-lr-0-xl">
                                <div class="wrap-table-shopping-cart">
                                    <table class="table-shopping-cart">
                                        <tr class="table_head">
                                            <th class="column-1">Product</th>
                                            <th class="column-2">Product Name</th>
                                            <th class="column-3">Price</th>
                                            <th class="column-4">Quantity</th>
                                            <th class="column-5">Total</th>
                                            <th class="column-6">Address</th>
                                            <th class="column-7">Date</th>
                                        </tr>
                                        {
                                        data.map(item => {
                                            return <tr class="table_row">
                                                <td class="column-1">
                                                    <div class="how-itemcart1">
                                                        <img src={`http://secret-bastion-22485.herokuapp.com/uploads/${item.product_image}`} alt="IMG" />
                                                    </div>
                                                </td>
                                                <td class="column-2">{item.productname}</td>
                                                <td class="column-3">$ {item.product_price}</td>
                                                <td class="column-4" >{item.product_quantity}</td>
                                                <td class="column-5">{parseInt(item.product_price)*item.product_quantity} $</td>
                                                <td class="column-6">{item.address}</td>
                                                <td class="column-7">{item.buydate}</td>
                                            </tr>})
                                        }
                                </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </React.Fragment>
    :<h1>{msg}</h1>
}
        </div>
    )   
}
export default Profile;