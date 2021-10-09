import React from "react";

export default function MealInfo(props) {
    return <div className="flex-50">
        <img src="src/client/assets/images/meal_default.png" alt="Meal image" style={{ width: "100%" }} />
        <h1><b>{props.meal.title}</b></h1>
        <div>
            <p>{props.meal.description}</p>
            <p>Where: {props.meal.location}</p>
            <p>When: {props.meal.when.slice(0, 10)}</p>
            <p>Price: {Number(props.meal.price).toFixed(0)} DKK</p>
        </div>
    </div>
}