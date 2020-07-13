import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import * as cartActions from '../actions/cart'
import { bindActionCreators } from 'redux'
import {Link} from 'react-router-dom'
import {usdToEur} from '../actions/usdToEur'
import OrderModal from './OrderModal'
import Message from './Message'



const deliveryCost = 5;

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'isModalOpen': false,
            'showMessage': false
        }

        this.changeStateForModal = this.changeStateForModal.bind(this);
        this.changeStateForMessage = this.changeStateForMessage.bind(this);
    }

    changeStateForModal() {
        this.setState({'isModalOpen': !this.state.isModalOpen});
    }

    changeStateForMessage() {
        this.setState({'showMessage': true});
        setTimeout(() => this.setState({'showMessage': false}), 3000);
    }

    renderCart() {
        const cartItems = [];

        this.props.cartItems.forEach(element => {
            if (cartItems.findIndex(e => e.id == element.id) == -1) {
                cartItems.push(element);
            }
        });

        const sortedCart = cartItems.sort((a, b) => {
            if (a.id > b.id) {
                return 1;
            } else if (a.id < b.id) {
                return -1;
            }
            return 0;
        });



        return sortedCart.map(pizza => {
            const itemArr = this.props.cartItems.filter(item => item.id === pizza.id);
            const countPizzaInCart = itemArr.length;
            return(
                <li className="list-group-item d-flex justify-content-between align-items-center flex-mobile" key={pizza.id}>
                    <div className="d-flex align-items-center flex-mobile">
                        <img width="100px" height="100px" className="rounded mr-2" src={`/images/pizzas/${pizza.image}`} />
                        <h4 className="m-0">{pizza.name}</h4>
                    </div>
                    <div className="d-flex align-items-center flex-mobile">
                        <h5 className="mb-0 mr-2">{pizza.price}$ ({Math.floor(usdToEur(pizza.price) * 10) / 10}€) x {countPizzaInCart}</h5>
                        <div className="border rounded">
                            <button onClick={()=>this.props.removePizzaFromCart(pizza.id)} className="btn">-</button>
                            <button onClick={()=>this.props.addPizzaToCart(pizza)} className="btn">+</button>
                        </div>
                    </div>
                </li>
            );
        })
    }

    render() {
        return(
                <div>
                    <h1 className="text-center">Cart</h1>
                    {this.props.cartItems.length > 0 ?
                        <div className="row">
                            <div className="d-flex justify-content-center align-items-center col-sm-12 flex-column">
                                <ul className="list-group list-group-flash col-sm-6 pr-0">
                                    {this.renderCart()}
                                </ul>
                                <h4 className="mt-3">DELIVERY COST: {deliveryCost}$ ({Math.floor(usdToEur(deliveryCost) * 10) / 10}€)</h4>
                                <h4 className="m-3">TOTAL PRICE: {this.props.totalPrice}$ ({usdToEur(this.props.totalPrice)}€)</h4>
                            </div>
                            <div className="col-sm-12 text-center mb-3 mt-5">
                                <button className="btn btn-success btn-lg" onClick={this.changeStateForModal}>Make Order</button>
                            </div>
                        </div>
                    :
                        <h2 className="text-center col-sm-12">You still haven't chosen any pizza! Go to <Link className="badge badge-info" to="/">menu</Link> and fix it.</h2>
                    }
                    {this.state.isModalOpen && <OrderModal showMessage={this.changeStateForMessage} close={this.changeStateForModal} />}
                    {this.state.showMessage && <Message head='Order is accepted!' body='Our courier is on the way.' state='alert-success' />}
                </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cartItems: state.items,
        totalPrice: state.items.reduce((total, pizza)=>total + pizza.price, 0)
    };
}

const mapDispatchProps = dispatch => ({
    ...bindActionCreators(cartActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchProps)(Cart)
