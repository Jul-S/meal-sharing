import React from "react";
import { Link } from "react-router-dom";

export default function MealListCard(props) {
    return <div className="card">
        <h3><b>{props.meal.title}</b></h3>
        <img src="src/client/assets/images/meal_default.png" alt="Meal image" style={{ width: "100%" }} />
        <div className="container">
            <p>{props.meal.description}</p>
            <p>Where: {props.meal.location}</p>
            <p>When: {props.meal.when.slice(0, 10)}</p>
            <p>Price: {Number(props.meal.price).toFixed(0)} DKK</p>
            <Link className="btn-link bgn-yellow" to={`/meals/${props.meal.id}`}>Book Meal</Link>
        </div>
    </div>
}