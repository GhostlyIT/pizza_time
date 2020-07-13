import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router-dom'
import LoadingSpinner from '../LoadingSpinner'



class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            id: '',
            dropDownShow: 'none'
        }

        this.getUserData = this.getUserData.bind(this);
        this.dropDown = this.dropDown.bind(this);
    }

    getUserData() {
        fetch('api/user/getData', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('user_name', data.user.name);
            localStorage.setItem('user_id', data.user.id);
            this.setState({userName: localStorage.getItem('user_name'), id: localStorage.getItem('user_id')})
        });
    }

    componentDidMount() {
        if (localStorage.getItem('user_name') != null && localStorage.getItem('user_id') != null) {
            this.setState({userName: localStorage.getItem('user_name'), id: localStorage.getItem('user_id')});
        } else if (localStorage.getItem('access_token')) {
            this.getUserData();
        }
    }


    dropDown() {
        if (this.state.dropDownShow == 'none') {
            this.setState({dropDownShow: 'block'})
        } else {
            this.setState({dropDownShow: 'none'})
        }
    }

    render() {
        if (localStorage.getItem('access_token')) {
            return(
                <div className="dropdown show">
                    <button onClick={() => this.dropDown()} className="btn btn-secondary dropdown-toggle">
                        {this.state.userName == '' ? <LoadingSpinner /> : 'Hi, ' + this.state.userName}
                    </button>

                    <div className="dropdown-menu" style={{display: this.state.dropDownShow}}>
                        <Link onClick={() => this.dropDown()} className="dropdown-item" to="/orders">
                            My orders
                        </Link>
                        <a onClick={() => {localStorage.clear(); this.dropDown(); window.location.reload();}} className="dropdown-item" href="#">Log out</a>
                    </div>
                </div>
            );
        } else {
            return(
                <Link to="/login">
                    <button className="btn btn-dark text-white">Sign in</button>
                </Link>
            );
        }
    }
}


export default User;
