import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router-dom'
import Message from '../Message'
import LoadingSpinner from '../LoadingSpinner'



class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginData: {
                email: '',
                password: ''
            },
            showMessage: false,
            message: '',
            messageState: '',
            messageHead: '',
            loading: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeStateForMessage = this.changeStateForMessage.bind(this);
    }

    changeStateForMessage() {
        this.setState({'showMessage': true});
        setTimeout(() => this.setState({'showMessage': false}), 3000);
    }

    handleInput(key, e) {
        var state = Object.assign({}, this.state.loginData);
        state[key] = e.target.value;
        this.setState({loginData: state});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({loading: true});
        fetch('api/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state.loginData)
        })
        .then(response => response.json())
        .then(data => {
            this.setState({loading: false});
            if (data.status == 'success') {
                localStorage.setItem('access_token', data.tokens.access_token);
                this.setState({messageState: 'alert-success'});
                setTimeout(() => window.location.reload(), 2000);
            } else {
                this.setState({messageState: 'alert-danger'});
            }
            this.setState({messageHead: data.status});
            this.setState({message: data.message});
            this.changeStateForMessage();


        });
    }

    render() {
        return(
            <div className="auth">
                <h2 className="text-center">Sign in</h2>
                <form className="d-flex flex-column" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input onChange={(e)=>{this.handleInput('email', e)}} type="email" className="form-control" id="email" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pass">Password</label>
                        <input onChange={(e)=>{this.handleInput('password', e)}} type="password" className="form-control" id="pass" placeholder="Password"/ >
                    </div>
                    <Link to='/register' style={{textDecoration: 'underline'}}>
                        Register new account
                    </Link>
                    <button type="submit" className="btn btn-primary mt-3" disabled={this.state.loading}>{this.state.loading ? <LoadingSpinner /> : 'Sign in'}</button>
                </form>
                {this.state.showMessage && <Message head={this.state.messageHead} body={this.state.message} state={this.state.messageState} />}
            </div>
        );
    }
}

export default Login
