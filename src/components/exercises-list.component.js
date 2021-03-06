import React, { Component } from "react";

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
            .delete("http://localhost:3000/exercises/" + id)
            .then(res => {
                console.log(res.data);

                this.setState(state => ({
                    exercises: state.exercises.filter(el => el._id !== id),
                }));
            })
            .catch(err => console.error(err));
    }

    render() {
        let { exercises } = this.state;
        console.log(exercises);

        exercises = exercises.sort((a, b) => {
            const x = new Date(a.date);
            const y = new Date(b.date);

            return x - y;
        });

        const list = exercises.map(i => {
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
