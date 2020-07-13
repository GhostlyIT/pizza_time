import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {usdToEur} from '../actions/usdToEur'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import User from './user/User'



class Header extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 border-bottom shadow-sm header sticky-top">
                <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between">
                    <Link to="/">
                        <h3 className="my-0 mr-md-auto font-weight-normal d-flex align-items-center">
                            <img width="45px" src="./images/logo.png" />
                            <span>PIZZA TIME</span>
                        </h3>
                    </Link>
                    <div className="d-flex w-auto justify-content-between align-items-center">
                        <div className="mr-3">
                            <Link to="/cart">
                                <span><FontAwesomeIcon icon={faShoppingCart} /> {this.props.itemsCount}</span>
                            </Link>
                        </div>
                        <div className="mr-3">
                            <span>Total price: {this.props.totalPrice}$ ({Math.floor(usdToEur(this.props.totalPrice) * 10) / 10}€)</span>
                        </div>
                        <User />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        itemsCount: state.items.length,
        totalPrice: state.items.reduce((total, pizza)=>total + pizza.price, 0)
    };
}

export default connect(mapStateToProps)(Header)
