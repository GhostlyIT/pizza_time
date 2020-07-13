import React, { Component } from 'react'
import ReactDOM from 'react-dom'


class Message extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let classes = {

        }
        return(
            <div className={`alert mt-5 mb-5 text-center ${this.props.state}`} role="alert">
                <h4 className="alert-heading">{this.props.head}</h4>
                <p>{this.props.body}</p>
            </div>
        );
    }
}

export default Message;
