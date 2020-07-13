import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import { Provider } from 'react-redux'
import {createStore} from 'redux'
import Header from './components/Header'
import Footer from './components/Footer'
import Menu from './components/Menu'
import Admin from './Admin'
import {cartState} from './redux/cartReducer'
import {loadState, saveState} from './actions/localStorage'
import Cart from './components/Cart'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import OrdersHistory from './components/user/OrdersHistory'

const persistedState = loadState();

const store = createStore(cartState, persistedState);
store.subscribe(() => {
    saveState(store.getState());
});

class Main extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <Header />
                <div className="container">
                    <Redirect from="/admin" to="/" />
                    <Route exact path="/" component={Menu} />
                    <Route path="/cart" component={Cart} />
                    {localStorage.getItem('access_token') ? <Redirect from='/login' to='/' /> : <Route path="/login" component={Login} />}
                    {localStorage.getItem('access_token') ? <Redirect from='/register' to='/' /> : <Route path="/register" component={Register} />}
                    {localStorage.getItem('access_token') ? <Route path="/orders" component={OrdersHistory} />: <Redirect from='/orders' to='/' />}
                </div>
                <Footer />
            </div>
        );
    }
}

export default Main
if (document.getElementById('main')) {
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <Main />
            </BrowserRouter>
        </Provider>
    , document.getElementById('main'));
}
