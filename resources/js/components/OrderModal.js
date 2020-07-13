import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import LoadingSpinner from './LoadingSpinner'
import {connect} from 'react-redux'
import * as cartActions from '../actions/cart'
import { bindActionCreators } from 'redux'
import InputMask from "react-input-mask"


class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newOrder: {
                name: '',
                address: '',
                phone: '',
                order_price: this.props.totalPrice,
                products: this.props.cartItemsId,
                user_id: localStorage.getItem('user_id')
            },
            loading: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(key, e) {
        var state = Object.assign({}, this.state.newOrder);
        state[key] = e.target.value;
        this.setState({newOrder: state});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({loading: true});

        fetch('api/order/add', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state.newOrder)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.status);
            this.setState({loading: false});
            this.props.removeAllFromCart();
            this.props.close();
            this.props.showMessage();
        });
    }

    render() {
        return(
            <div className="modal-container">
                <div className="modal-overlay" onClick={()=>this.props.close()}></div>
                <div className="modal-content">
                    <form onSubmit={this.handleSubmit} >
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input onChange={(e)=>{this.handleInput('name', e)}} type="text" className="form-control" id="name" placeholder="Enter your name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input onChange={(e)=>{this.handleInput('address', e)}} className="form-control" id="address" placeholder="Enter your address" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <InputMask onChange={(e)=>{this.handleInput('phone', e)}} mask="8(999)999-99-99" className="form-control" id="phone" alwaysShowMask={true} />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={this.state.loading}>{this.state.loading ? <LoadingSpinner /> : 'Make order'}</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        totalPrice: state.items.reduce((total, pizza)=>total + pizza.price, 0),
        cartItemsId: state.items.map(item => item.id)
    };
}

const mapDispatchProps = dispatch => ({
    ...bindActionCreators(cartActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchProps)(Modal)
