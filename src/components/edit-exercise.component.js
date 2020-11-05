import React, { Component } from "react";

import axios from "axios";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercise extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            description: "",
            duration: 0,
            date: new Date(),
            users: [],
        };

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onDurationChange = this.onDurationChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios
            .get(
                "http://localhost:3000/exercises/" + this.props.match.params.id
            )
            .then(res => {
                const { username, description, duration, date } = res.data;

                this.setState({
                    username,
                    description,
                    duration,
                    date: new Date(date),
                });
            })
            .catch(err => console.error(err));

        // Fetch list of users
        axios
            .get("http://localhost:3000/users/")
            .then(res => {
                if (res.data.length > 0) {
                    const uArr = res.data.map(u => u.username);
                    this.setState({
                        users: uArr,
                    });
                }
            })
            .catch(err => console.error(err));
    }

    onUsernameChange(e) {
        this.setState({
            username: e.target.value,
        });
    }

    onDescriptionChange(e) {
        this.setState({
            description: e.target.value,
        });
    }

    onDurationChange(e) {
        this.setState({
            duration: e.target.value,
        });
    }

    onDateChange(date) {
        this.setState({
            date: date,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const { username, description, duration, date } = this.state;

        const exercise = {
            username,
            description,
            duration,
            date,
        };

        console.log(exercise);

        axios
            .post(
                "http://localhost:3000/exercises/update/" +
                    this.props.match.params.id,
                exercise
            )
            .then(res => console.log(res.data));

        window.location = "/";
    }

    render() {
        const users = this.state.users.map((user, idx) => {
            return (
                <option value={user} key={idx}>
                    {user}
                </option>
            );
        });

        return (
            <div>
                <h3>Edit Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label htmlFor='userSelect'>Username: </label>
                        <select
                            name='userSelect'
                            id='userSelect'
                            ref='userInput'
                            required
                            className='form-control'
                            value={this.state.username}
                            onChange={this.onUsernameChange}
                        >
                            {users}
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='description'>Description: </label>
                        <input
                            type='text'
                            name='description'
                            required
                            className='form-control'
                            value={this.state.description}
                            onChange={this.onDescriptionChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='duration'>Duration (in minutes):</label>
                        <input
                            type='number'
                            name='duration'
                            className='form-control'
                            value={this.state.duration}
                            onChange={this.onDurationChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onDateChange}
                            />
                        </div>
                    </div>

                    <div className='form-group'>
                        <input
                            type='submit'
                            value='Edit Exercise Log'
                            className='btn btn-primary'
                        />
                    </div>
                </form>
            </div>
        );
    }
}
