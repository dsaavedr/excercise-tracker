import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import Exercise from "./exercise.component";

export default class ExercisesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            exercises: [],
        };

        this.deleteExercise = this.deleteExercise.bind(this);
    }

    componentDidMount() {
        axios
            .get("http://localhost:3000/exercises/")
            .then(res => {
                this.setState({
                    exercises: res.data,
                });
            })
            .catch(err => console.error(err));
    }

    deleteExercise(id) {
        axios
            .delete("http://localhost:5000/exercises/" + id)
            .then(res => console.log(res.data))
            .catch(err => console.error(err));

        this.setState(state => ({
            exercises: state.exercises.filter(el => el._id !== id),
        }));
    }

    render() {
        const { exercises } = this.state;

        const list = exercises.map((i, idx) => {
            return (
                <Exercise
                    exercise={i}
                    deleteExercise={this.deleteExercise}
                    key={i._id}
                />
            );
        });

        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className='table'>
                    <thead className='thead-light'>
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>{list}</tbody>
                </table>
            </div>
        );
    }
}
