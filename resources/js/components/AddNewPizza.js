import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios, { post } from 'axios';

class AddNewPizza extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newPizza: {
                'name': '',
                'description': '',
                'price': 0,
                'image': ''
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.hanleInput = this.handleInput.bind(this);
    }

    handleInput(key, e) {
        var state = Object.assign({}, this.state.newPizza);
        state[key] = e.target.value;
        this.setState({newPizza: state});
    }

    handleFileInput(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.createImage(files[0]);
    }

    createImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
            let state = Object.assign({}, this.state.newPizza);
            state['image'] = e.target.result;
            this.setState({newPizza: state});
        }
        reader.readAsDataURL(file);
    }

    imageUpload(image) {
        const url = 'api/pizzas/imageUpload';
        const formData = {image: image};
        return post(url, formData).then(response => this.state.newPizza.image = response.data);
    }

    async handleSubmit(e) {
        e.preventDefault();
        const uploadImage = new Promise ((resolve, reject) => {
            resolve(this.imageUpload(this.state.newPizza.image));
        });
        uploadImage.then(() => {
            this.props.onAdd(this.state.newPizza);
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="pizzaName">Pizza name</label>
                    <input onChange={(e)=>{this.handleInput('name', e)}} type="text" className="form-control" id="pizzaName" placeholder="Enter pizza name" />
                </div>
                <div className="form-group">
                    <label htmlFor="pizzaDescription">Description</label>
                    <textarea onChange={(e)=>{this.handleInput('description', e)}} className="form-control" id="pizzaDescription" rows="3"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="pizzaPrice">Price (in dollars)</label>
                    <input onChange={(e)=>{this.handleInput('price', e)}} type="number" className="form-control" id="pizzaPrice" placeholder="Enter price for pizza" />
                </div>
                <div className="form-group">
                    <label htmlFor="pizzaImage">Image for pizza</label>
                    <input onChange={(e)=>{this.handleFileInput(e)}} type="file" className="form-control-file" id="pizzaImage" />
                </div>
                <button type="submit" className="btn btn-primary">Add new pizza!</button>
            </form>
        );
    }
}

export default AddNewPizza;
