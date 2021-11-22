import React from "react";
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './routs/Home'
import Meals from './routs/Meals'
import About from './routs/About'
import MealDetails from './routs/MealDetails'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TestComponent from "./components/TestComponent/TestComponent";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/meals">
          <Meals />
        </Route>
        <Route exact path="/meals/:mealId" component={MealDetails} />
        <Route exact path="/about" component={About} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
