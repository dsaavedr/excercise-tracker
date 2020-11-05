import React, { Component } from "react";

import axios from "axios";

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
        };
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onUsernameChange(e) {
        this.setState({
            username: e.target.value,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
        };

        console.log(user);

        axios
            .post("http://localhost:3000/users/add", user)
            .then(res => console.log(res.data))
            .catch(err => console.error(err));

        this.setState({
            username: "",
        });
    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label htmlFor='username'>Username: </label>
                        <input
                            type='text'
                            required
                            name='username'
                            className='form-control'
                            value={this.state.username}
                            onChange={this.onUsernameChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='submit'
                            value='Create User'
                            className='btn btn-primary'
                        />
                    </div>
                </form>
            </div>
        );
    }
}
