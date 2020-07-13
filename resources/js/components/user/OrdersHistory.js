import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router-dom'
import {usdToEur} from '../../actions/usdToEur'
import LoadingSpinner from '../LoadingSpinner';



class OrdersHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: false
        }

        this.getOrdersHistory = this.getOrdersHistory.bind(this);
        this.renderHistory = this.renderHistory.bind(this);
    }

    getOrdersHistory() {
        fetch(`api/order/get/${localStorage.getItem('user_id')}`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => this.setState({orders: data}))
    }

    componentDidMount() {
        if (!this.state.orders) {
            this.getOrdersHistory();
        }
    }

    renderHistory() {

        return this.state.orders.map(order => {
            return(
                <li className="list-group-item d-flex justify-content-between align-items-center flex-mobile flex-column" key={order.id}>
                    <div className="d-flex align-items-center flex-mobile">
                        <label className="text-center mb-3">
                            Date
                            <h4 className="m-0">{order.created_at}</h4>
                        </label>
                    </div>
                    <div className="d-flex align-items-center flex-mobile">
                        <label className="text-center mb-3">
                            Address
                            <h4 className="m-0">{order.address}</h4>
                        </label>
                    </div>
                    <div className="d-flex align-items-center flex-mobile">
                        <label className="text-center mb-3">
                            Phone
                            <h4 className="m-0">{order.phone}</h4>
                        </label>
                    </div>
                    <div className="d-flex align-items-center flex-mobile">
                        <label className="text-center mb-3">
                            Pizzas
                            <h4 className="m-0">{order.name}</h4>
                        </label>
                    </div>
                    <div className="d-flex align-items-center flex-mobile">
                        <label className="text-center">
                            Order price
                            <h5 className="mb-0 mr-2">{order.order_price}$ ({Math.floor(usdToEur(order.order_price) * 10) / 10}€)</h5>
                        </label>
                    </div>
                </li>
            );
        })
    }

    render() {
        return(
            <div>
                {this.state.orders ? <ul>{this.renderHistory()}</ul> : <LoadingSpinner />}
            </div>
        );
    }
}

export default OrdersHistory;
