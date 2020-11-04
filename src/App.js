import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Route path="/" component={ExercisesList} exact></Route>
        <Route path="/edit/:id" component={EditExercise}></Route>
        <Route path="/create" component={CreateExercise}></Route>
        <Route path="/user" component={CreateUser}></Route>
      </div>
    </Router>
  );
}
