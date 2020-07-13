import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class Footer extends Component {

    render() {
        return(
            <footer className="blog-footer">
                <p>Made by <a href="https://career.habr.com/sunset-code">Sunset_Code</a></p>
                <p>
                    <a href="#">Back to top</a>
                </p>
            </footer>
        );
    }
}

export default Footer;
