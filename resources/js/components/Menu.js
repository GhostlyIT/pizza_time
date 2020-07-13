import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import LoadingSpinner from './LoadingSpinner'
import {connect} from 'react-redux'
import * as cartActions from '../actions/cart'
import { bindActionCreators } from 'redux'


class Menu extends Component {
    constructor(props) {
        super();
        this.state = {
            'pizzas': [],
            'loading': true
        }
    }

    componentDidMount() {
        fetch('api/pizzas')
        .then(response => {
            return response.json();
        })
        .then(pizzas => {
            this.setState({pizzas, 'loading': false});
        })
    }

    renderPizzas() {
        return this.state.pizzas.map(pizza => {
            let arr = this.props.cartItems.filter(item => item.id === pizza.id);
            let countPizzaInCart = arr.length;
            return(
                <div className="card col-sm-12 col-md-4 pt-3 align-items-center mb-3" key={pizza.id}>
                    <img width="315px" height="315px" className="rounded" src={`/images/pizzas/${pizza.image}`} />
                    <div className="card-body text-center">
                        <h4 className="card-title text-center">{pizza.name}</h4>
                        <p className="card-text mb-2">{pizza.description}</p>
                        <hr />
                        <div className="d-flex w-50 justify-content-between align-items-center cart-btn-container">
                            <p className="m-0">{pizza.price}$</p>
                            {countPizzaInCart > 0 ?
                                <div className="d-flex justify-content-between align-items-center border rounded border-dark cart-btn">
                                    <button onClick={()=>this.props.removePizzaFromCart(pizza.id)} className="btn">-</button>
                                    <span>{countPizzaInCart}</span>
                                    <button onClick={()=>this.props.addPizzaToCart(pizza)} className="btn">+</button>
                                </div>
                            :
                                <button onClick={()=>this.props.addPizzaToCart(pizza)} className="btn btn-primary cart-btn">Add to cart</button>
                            }
                        </div>
                    </div>
                </div>
            );
        })
    }

    render() {
        return(
                <div>
                    <h1 className="text-center">Menu</h1>
                    <div className="row">
                        {this.state.loading ? <LoadingSpinner /> : this.renderPizzas()}
                    </div>
                </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cartItems: state.items
    };
}

const mapDispatchProps = dispatch => ({
    ...bindActionCreators(cartActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchProps)(Menu)
