import React from 'react';
import Header from './Componet/Header/Header';
import { BrowserRouter, Route, Switch,useLocation} from 'react-router-dom';
import Cartlist from './Componet/Cart/Cardlist';
import Home from './Componet/Home/Home';
import Addwishitem from './Componet/AddWish/Addwishitem';
import AddCart from './Componet/Checkout/AddCart';
import Login from './Componet/Login/Login';
import Register from './Componet/Register/Register';
import Product from './Componet/Product/product';
import Checkout from './Componet/Checkout/Checkout';
import ForgetPassword from './Componet/Login/ForgetPassword';
import Profile from './Componet/Profile/profile';
import SearchFeed from './Componet/Search/SearchFeed';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Register />
        </Route>
        <Route path="/" exact>
          <Header />
          <Home />
        </Route>
        <Route exact path="/products">
          <Header />
          <Cartlist />
        </Route>
        <Route path="/WishList" exact>
          <Header />
          <Addwishitem />
        </Route>
        <Route path="/Addcart" exact>
          <Header />
          <AddCart />
        </Route>
        <Route path="/product-details/:id" exact>
          <Header />
          <Product />
        </Route>
        <Route path="/forgetpassoword/:id">
            <ForgetPassword />
        </Route>
        <Route path="/checkout" exact>
          <Header />
        <Checkout />
        </Route>
        <Route path="/profile" exact>
          <Header />
          <Profile />
        </Route>
        <Route path="/serachfeed">
							<SearchFeed/>
				</Route>	
      </div>
    </BrowserRouter>
  );
}

export default App;
