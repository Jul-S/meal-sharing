import React from "react";
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './routs/Home'
import Meals from './routs/Meals'
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
        <Route exact path="/meals/:mealId">
          <MealDetails />
        </Route>
        <Route exact path="/test-component">
          <TestComponent></TestComponent>
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
