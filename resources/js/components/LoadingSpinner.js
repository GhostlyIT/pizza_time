import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class LoadingSpinner extends Component {
    render() {
        return(
            <div className="d-flex justify-content-center col-sm-12">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }
}

export default LoadingSpinner
