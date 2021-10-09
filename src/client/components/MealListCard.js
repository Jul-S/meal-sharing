import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function MealListCard(props) {
    const [mealAvailable, setMealAvailable] = useState(false);

    console.log(props.available);

    useEffect(() => {
        if (new Date(props.meal.when) > new Date() && props.available) { setMealAvailable(true) };
    })

    return <div className="card">
        <h3><b>{props.meal.title}</b></h3>
        <img src="src/client/assets/images/meal_default.png" alt="Meal image" style={{ width: "100%" }} />
        <div className="container">
            <p>{props.meal.description}</p>
            <p>Where: {props.meal.location}</p>
            <p>When: {props.meal.when.slice(0, 10)}</p>
            <p>Price: {Number(props.meal.price).toFixed(0)} DKK</p>
            {mealAvailable ?
                <Link className="btn-link bgn-yellow" to={{ pathname: `/meals/${props.meal.id}`, state: { mealAvailable: true } }}>Book Meal</Link> :
                <Link className="btn-link bgn-green" to={{ pathname: `/meals/${props.meal.id}`, state: { mealAvailable: false } }}>Add Review</Link>}
        </div>
    </div>
}