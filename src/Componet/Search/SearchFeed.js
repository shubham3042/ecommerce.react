import React, { useEffect, useState } from 'react';
import { useLocation, } from 'react-router-dom';
import Card from '../Cart/Card';
import axios from 'axios';
import Header from '../Header/Header';
import Spinner from 'react-spinner-material';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const SearchFeed = () => {
    let query = useQuery();

    const [data1, setData1] = useState([]);
    const [value, setValue] = useState('');
    const [isloading, setIsloading] = useState(true);
    const [msg, setMsg] = useState('');
    useEffect(async () => {
        setValue(query.get('value'))
        if (query.get('type') === 'search') {
            const ans = await axios.get(`https://secret-bastion-22485.herokuapp.com/search?value=${value}`);
            if (ans.data === false) {
                setMsg('not found');
                setIsloading(false);
                setData1([]);
            }
            else {
                setData1(ans.data);
                setIsloading(false);
                setMsg('');
            }

            setIsloading(false);

        }
        else if (query.get('type') === 'gender') {
            axios.get(`https://secret-bastion-22485.herokuapp.com/filter?value=${value}`)
                .then(ans => setData1(ans.data)).then(setIsloading(false));
        }
        else if (query.get('type') === 'acc') {
            axios.get(`https://secret-bastion-22485.herokuapp.com/category?value=${value}`)
                .then(ans => setData1(ans.data))
                .then(setIsloading(false));
        }
    }, [data1, value]);
    return (
        <React.Fragment>
            <Header />
            <div style={{ marginTop: "80px" }}>
                {isloading === true ?
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "80px" }}>
                        <Spinner radius={120} color={"#333"} stroke={2} visible={isloading} />
                    </div>
                    :
                    <div class="container">
                        <div class="flex-w flex-sb-m p-b-52" >
                            <div className="row isotope-grid" style={{ marginTop: "10px" }}>
                                {
                                    data1.length > 0 ?
                                        data1.map(item => {
                                            return <Card image1={item.product_image} name={item.productname} price={item.product_price} product_id={item.product_id} />
                                        })
                                        : null
                                }
                                {
                                    msg !== '' ?
                                        <h1>{msg}</h1>
                                        : null
                                }
                            </div>
                        </div>

                    </div>
                }
            </div>
        </React.Fragment>
    )
}
export default SearchFeed;