import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import AddNewPizza from './components/AddNewPizza'
import Header from './components/Header'

class Admin extends Component {
    constructor() {
        super();
        this.state= {
            'pizzas': []
        }

        this.handleAddPizza = this.handleAddPizza.bind(this);
    }

    handleAddPizza(pizza) {
        fetch('api/pizzas/add', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(pizza)
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            this.setState((prevState) => ({
                'pizzas': prevState.pizzas.concat(data)
            }))
        })
    }

    render() {
        return(
            <div>
                    <AddNewPizza onAdd={this.handleAddPizza} />
            </div>
        );
    }
}

export default Admin
