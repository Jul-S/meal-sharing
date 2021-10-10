import React from "react";

export default function MealInfo(props) {
    return <div>
        <img src="meal_default.png" alt="Meal image" style={{ width: "100%" }} />
        <h3><b>{props.meal.title}</b></h3>
        <div>
            <p>{props.meal.description}</p>
            <p>Where: {props.meal.location}</p>
            <p>When: {props.meal.when.slice(0, 10)}</p>
            <p>Price: {Number(props.meal.price).toFixed(0)} DKK</p>
        </div>
    </div>
}